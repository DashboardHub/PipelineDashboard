// Third party modules
import * as admin from 'firebase-admin';
import { firestore, Change, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { FirebaseAdmin } from './../client/firebase-admin';


export declare type DocumentSnapshot = admin.firestore.DocumentSnapshot;
export declare type DocumentData = admin.firestore.DocumentData;

export const onUpdateDeleteRepository: CloudFunction<Change<DocumentSnapshot>> = firestore
  .document('repositories/{repositoryUid}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {

    try {
      const newData: DocumentData = change.after.data();

      if (!newData.projects || Array.isArray(newData.projects) && newData.projects.length === 0) {
        return FirebaseAdmin.firestore().collection('repositories').doc(context.params.repositoryUid).delete();
      }

      return newData;

    } catch (err) {
      console.log(err)
      throw err;
    }

  });
