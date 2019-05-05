import * as admin from 'firebase-admin';
import axios from 'axios';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

import { GitHubEventInput, GitHubEventMapper } from '../mappers/github/index.mapper';
import { GitHubClient, GitHubResponse } from './../client/github';

interface Input {
    token: string;
    username: string;
}

export const getUserEvents: functions.HttpsFunction = functions.https.onCall((input: Input, context: CallableContext) => {
    return axios.all([
        GitHubClient(input.token).get(`/users/${input.username}/events`),
    ])
    .then(axios.spread((events: GitHubResponse<GitHubEventInput[]>) => admin
            .firestore()
            .collection('users')
            .doc(context.auth.uid)
            .set({
                activity: events.data.map((event: GitHubEventInput) => GitHubEventMapper.import(event))
            }, { merge: true }))
    );
});
