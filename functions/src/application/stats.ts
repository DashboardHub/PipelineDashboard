// Third party modules
import * as firebase from 'firebase-admin';
import { firestore, CloudFunction, EventContext } from 'firebase-functions';
import { DocumentSnapshot, FirebaseAdmin } from '../client/firebase-admin';
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
            projects: firebase.firestore.FieldValue.increment(1),
          },
          { merge: true });
    } catch (err) {
      console.log("Error")
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
            users: firebase.firestore.FieldValue.increment(1),
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
            pings: firebase.firestore.FieldValue.increment(1),
          },
          { merge: true });
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }
  });
