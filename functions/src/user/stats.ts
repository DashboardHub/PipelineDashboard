// Third party modules
import * as admin from 'firebase-admin';
import { firestore, Change, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { DocumentData, DocumentSnapshot, FirebaseAdmin } from './../client/firebase-admin';
import { Logger } from './../client/logger';
import { GitHubUserStatsModel } from './../mappers/github/user.mapper';

export const onUpdateUserStats: any = firestore
  .document('users/{userId}')
  .onWrite((change: Change<DocumentSnapshot>, context: EventContext) => {
    const user: DocumentData = change.after.data();

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

    Logger.info({
      user: user.username,
      imported: {},
    });

    return FirebaseAdmin
      .firestore()
      .collection('userStats')
      .doc(user.uid)
      .set(data, { merge: true });
  });
