import * as admin from 'firebase-admin';
import { Change, EventContext, firestore } from 'firebase-functions';
import { FirebaseAdmin } from './../client/firebase-admin';

import { getUserRepos } from './repos';
import { GitHubUserStatsModel } from './../mappers/github/user.mapper';

export declare type DocumentSnapshot = admin.firestore.DocumentSnapshot;
export declare type DocumentData = admin.firestore.DocumentData;

export const updateUserStats: any = firestore
    .document('users/{userId}')
    .onWrite((change: Change<DocumentSnapshot>, context: EventContext) => {
        const user: DocumentData = change.after.data();
        const userBefore: DocumentData = change.before.data();

        const data: GitHubUserStatsModel = {
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

        const promises: Promise<FirebaseFirestore.WriteResult>[] = [];

        // update user's repos
        if (userBefore.lastSignInTime !== user.lastSignInTime) {
            promises.push(getUserRepos(user.token, user.uid));
        }

        promises.push(FirebaseAdmin
            .firestore()
            .collection('userStats')
            .doc(user.uid)
            .set(data, { merge: true }));

        return Promise.all(promises);
    });
