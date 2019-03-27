import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

import { GitHubPullRequestMapper, GitHubRepositoryMapper, GitHubEventMapper, GitHubReleaseMapper } from './mappers/github/index.mapper';

admin.initializeApp();

const http = (token: string) => axios.create({
    baseURL: 'https://api.github.com',
    timeout: 1000,
    headers: {
        'User-Agent': 'DashboardHub',
        Authorization: `token ${token}`
    }
});

const getUserRepos = (token: string, uid: string) => http(token).get('/user/repos')
    .then((response) => response.data.map((repository) => GitHubRepositoryMapper.import(repository)))
    .then((repositories) => admin
                                .firestore()
                                .collection('users')
                                .doc(uid)
                                .set({
                                    repositories: {
                                        lastUpdated: new Date(),
                                        data: repositories,
                                    }
                                }, { merge: true })
    );

export const findAllUserRepositories = functions.https.onCall((input, context) => getUserRepos(input.token, context.auth.uid));

export const getRepositoryInfo = functions.https.onCall((input, context) => {
    return axios.all([
        http(input.token).get(`/repos/${input.fullName}`),
        http(input.token).get(`/repos/${input.fullName}/pulls?state=open`),
        http(input.token).get(`/repos/${input.fullName}/events`),
        http(input.token).get(`/repos/${input.fullName}/releases`),
    ])
    .then(axios.spread((repository, pullrequests, events, releases) => admin
            .firestore()
            .collection('repositories')
            .doc(GitHubRepositoryMapper.fullNameToUid(input.fullName))
            .set({
                events: events.data.map((event) => GitHubEventMapper.import(event)),
                pullRequests: pullrequests.data.map((pullrequest) => GitHubPullRequestMapper.import(pullrequest)),
                releases: releases.data.map((release) => GitHubReleaseMapper.import(release)),
                ...GitHubRepositoryMapper.import(repository.data, 'all')
            }, { merge: true }))
    );
});

export const getUserEvents = functions.https.onCall((input, context) => {
    return axios.all([
        http(input.token).get(`/users/${input.username}/events`),
    ])
    .then(axios.spread((events) => admin
            .firestore()
            .collection('users')
            .doc(context.auth.uid)
            .set({
                activity: events.data.map((event) => GitHubEventMapper.import(event))
            }, { merge: true }))
    );
});

export const updateUserStats = functions.firestore
    .document('users/{userId}')
    .onWrite((change, context) => {
        const user = change.after.data();
        const userBefore = change.before.data();

        const data = {
            name: user.name,
            username: user.username,
            avatarUrl: user.avatarUrl,
            github: {
                repository: {
                    total: user.repositories.data.length || 0,
                },
                activity: {
                    latest: user.activity ? user.activity[0] : {},
                },
            },
            lastUpdated: new Date(),
        };

        const promises = [];

        // update user's repos
        if (userBefore.lastSignInTime !== user.lastSignInTime) {
            promises.push(getUserRepos(user.token, user.uid));
        }

        promises.push(admin
            .firestore()
            .collection('userStats')
            .doc(user.uid)
            .set(data, { merge: true }));

        return Promise.all(promises);
});
