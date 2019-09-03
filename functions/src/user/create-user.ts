// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';
import { v4 as uuid } from 'uuid';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { GitHubRepositoryModel } from '../mappers/github/index.mapper';
import { DocumentData, DocumentSnapshot } from './../client/firebase-admin';

// Dashboard models
import { RepositoryModel } from '../models/index.model';

async function addUidToRepositories(user: DocumentData): Promise<boolean> {
  if (user.repositories && Array.isArray(user.repositories.data) && user.repositories.data.length > 0) {
    const uids: string[] = [];
    user.repositories.data = user.repositories.data
      .filter((item: GitHubRepositoryModel) => item && item.id !== null && item.id !== undefined);

    for (const item of user.repositories.data) {
      const exitsRepoUid: string = await RepositoryModel.getRepositoryUidById(item.id);
      if (exitsRepoUid) {
        item.uid = exitsRepoUid;
      } else {
        item.uid = uuid();
      }
      uids.push(item.uid);
    }
    user.repositories.data.uids = uids
    return true;
  }

  return false;
}

export const onCreateUser: CloudFunction<DocumentSnapshot> = firestore
  .document('users/{userUid}')
  .onCreate(async (userSnapshot: DocumentSnapshot, context: EventContext) => {
    try {
      const newData: DocumentData = userSnapshot.data();
      const isNeedUpdate: boolean = await addUidToRepositories(newData);
      if (isNeedUpdate) {
        await userSnapshot.ref.update(newData);
      }
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }
  });
