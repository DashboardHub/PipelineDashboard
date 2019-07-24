// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { DocumentData, DocumentSnapshot, FirebaseAdmin, QueryDocumentSnapshot } from './../client/firebase-admin';

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
      Logger.error(err);
      throw new Error(err);
    }

  });
