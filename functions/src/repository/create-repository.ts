// Third party modules
import * as admin from 'firebase-admin';
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { FirebaseAdmin } from './../client/firebase-admin';


export declare type DocumentSnapshot = admin.firestore.DocumentSnapshot;
export declare type DocumentData = admin.firestore.DocumentData;
export declare type QuerySnapshot = admin.firestore.QuerySnapshot;
export declare type QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;

export const onCreateRepository: CloudFunction<DocumentSnapshot> = firestore
  .document('repositories/{repositoryUid}')
  .onCreate(async (repositorySnapshot: DocumentSnapshot, context: EventContext) => {

    try {
      const newData: DocumentData = repositorySnapshot.data();

      const projects: QueryDocumentSnapshot[] = (await FirebaseAdmin.firestore().collection('projects').where('repositories', 'array-contains', context.params.repositoryUid).get()).docs;

      if (!Array.isArray(newData.projects)) {
        newData.projects = [];
      }

      for (const project of projects) {
        newData.projects.push(project.id);
      }

      if (projects.length > 0) {
        return repositorySnapshot.ref.update(newData);
      }

      return newData;

    } catch (err) {
      console.log(err)
      throw err;
    }

  });
