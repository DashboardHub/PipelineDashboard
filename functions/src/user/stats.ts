// Third party modules
import * as admin from 'firebase-admin';
import { firestore, Change, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { FirebaseAdmin } from './../client/firebase-admin';
import { Logger } from './../client/logger';
import { GitHubUserStatsModel } from './../mappers/github/user.mapper';
import { getUserRepos } from './repos';

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
      lastUpdated: admin.firestore.Timestamp.fromDate(new Date()),
    };

    const promises: Promise<FirebaseFirestore.WriteResult>[] = [];

    // update user's repos
    if (userBefore.lastSignInTime !== user.lastSignInTime) {
      promises.push(getUserRepos(user.token, user.uid));
    }

    Logger.info({
      user: user.username,
      imported: {},
    });

    promises.push(FirebaseAdmin
      .firestore()
      .collection('userStats')
      .doc(user.uid)
      .set(data, { merge: true }));

    return Promise.all(promises);
  });
