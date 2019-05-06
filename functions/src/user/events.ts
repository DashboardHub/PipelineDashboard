import { FirebaseAdmin } from './../index';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

import { GitHubEventInput, GitHubEventMapper, GitHubEventModel } from '../mappers/github/index.mapper';
import { GitHubClient } from './../client/github';

interface Input {
    token: string;
    username: string;
}

export const getUserEvents: functions.HttpsFunction = functions.https.onCall(async (input: Input, context: CallableContext) => {
    const events: GitHubEventInput[] = await GitHubClient<GitHubEventInput[]>(`/users/${input.username}/events`, input.token);
    const mappedEvents: GitHubEventModel[] = events.map((event: GitHubEventInput) => GitHubEventMapper.import(event));

    await FirebaseAdmin
        .firestore()
        .collection('users')
        .doc(context.auth.uid)
        .set({
            activity: mappedEvents,
        }, { merge: true });

    return mappedEvents;
});
