// Third party modules
import { firestore, Change, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { RepositoryModel } from '../models/index.model';
import { DocumentData, DocumentSnapshot } from './../client/firebase-admin';
import { deleteRepoBuilds } from './pull-request';

export const onUpdateRepository: CloudFunction<Change<DocumentSnapshot>> = firestore
  .document('repositories/{repositoryUid}')
  .onUpdate( async (change: Change<DocumentSnapshot>, context: EventContext) => {

    try {
      const newData: DocumentData = change.after.data();

      if (!newData.projects || Array.isArray(newData.projects) && newData.projects.length === 0) {
        Logger.info(`Delete repository ${context.params.repositoryUid}`);
        await deleteRepoBuilds(context.params.repositoryUid);
        return RepositoryModel.getRepositoryReference(context.params.repositoryUid).delete();
      }

      return newData;

    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }

  });
