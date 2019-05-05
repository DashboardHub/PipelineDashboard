import { GitHubReleaseInput } from './../mappers/github/release.mapper';
import * as admin from 'firebase-admin';
import axios from 'axios';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

import { GitHubClient, GitHubResponse } from './../client/github';
import { GitHubEventInput, GitHubRepositoryMapper, GitHubEventMapper, GitHubPullRequestMapper, GitHubPullRequestInput, GitHubReleaseMapper, GitHubRepositoryInput } from '../mappers/github/index.mapper';

interface Input {
    token: string;
    fullName: string;
}

export const getRepositoryInfo: functions.HttpsFunction = functions.https.onCall((input: Input, context: CallableContext) => {
    return axios.all([
        GitHubClient(input.token).get(`/repos/${input.fullName}`),
        GitHubClient(input.token).get(`/repos/${input.fullName}/pulls?state=open`),
        GitHubClient(input.token).get(`/repos/${input.fullName}/events`),
        GitHubClient(input.token).get(`/repos/${input.fullName}/releases`),
    ])
    .then(axios.spread((repository: GitHubResponse<GitHubRepositoryInput>, pullrequests: GitHubResponse<GitHubPullRequestInput[]>, events: GitHubResponse<GitHubEventInput[]>, releases: GitHubResponse<GitHubReleaseInput[]>) => admin
            .firestore()
            .collection('repositories')
            .doc(GitHubRepositoryMapper.fullNameToUid(input.fullName))
            .set({
                events: events.data.map((event: GitHubEventInput) => GitHubEventMapper.import(event)),
                pullRequests: pullrequests.data.map((pullrequest: GitHubPullRequestInput) => GitHubPullRequestMapper.import(pullrequest)),
                releases: releases.data.map((release: GitHubReleaseInput) => GitHubReleaseMapper.import(release)),
                ...GitHubRepositoryMapper.import(repository.data, 'all')
            }, { merge: true }))
    );
});
