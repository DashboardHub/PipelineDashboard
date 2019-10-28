// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

import { DocumentSnapshot, FirebaseAdmin, IncrementFieldValue } from '../client/firebase-admin';

import { Logger } from '../client/logger';

export const onCreateProject: CloudFunction<DocumentSnapshot> = firestore
  .document('projects/{projectUid}')
  .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
    try {
      await FirebaseAdmin
        .firestore()
        .collection('platform')
        .doc('stats')
        .set(
          {
            projects: IncrementFieldValue,
          },
          { merge: true });
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }
  });

export const onCreateUser: CloudFunction<DocumentSnapshot> = firestore
  .document('users/{userUid}')
  .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
    try {
      await FirebaseAdmin
        .firestore()
        .collection('platform')
        .doc('stats')
        .set(
          {
            users: IncrementFieldValue,
          },
          { merge: true });
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }
  });

export const onCreatePings: CloudFunction<DocumentSnapshot> = firestore
  .document('projects/{projectUid}/pings/{pingUid}')
  .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
    try {
      await FirebaseAdmin
        .firestore()
        .collection('platform')
        .doc('stats')
        .set(
          {
            pings: IncrementFieldValue,
          },
          { merge: true });
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }
  });

export const onCreateEvent: any = async (): Promise<any> => {
  try {
    await FirebaseAdmin
      .firestore()
      .collection('platform')
      .doc('stats')
      .set(
        {
          events: IncrementFieldValue,
        },
        { merge: true });
  } catch (err) {
    Logger.error(err);
    throw new Error(err);
  }
}
