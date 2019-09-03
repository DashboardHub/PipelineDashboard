// Third party modules
import { firestore, Change, EventContext } from 'firebase-functions';
import { v4 as uuid } from 'uuid';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { GitHubRepositoryModel } from '../mappers/github/index.mapper';
import { DocumentData, DocumentSnapshot } from './../client/firebase-admin';

// Dashboard models
import { RepositoryModel } from '../models/index.model';

async function updateRepositories(newData: DocumentData, previousData: DocumentData): Promise<any> {
  const isArrayNewDataRepositories: boolean = !!(newData && newData.repositories && Array.isArray(newData.repositories.data) && newData.repositories.data.length > 0);

  if (!isArrayNewDataRepositories) {
    return null;
  }

  const newRepos: GitHubRepositoryModel[] = newData.repositories.data;
  const isArrayPreviousDataRepositories: boolean = !!(previousData && previousData.repositories && Array.isArray(previousData.repositories.data) && previousData.repositories.data.length > 0);
  const oldRepos: GitHubRepositoryModel[] = isArrayPreviousDataRepositories ? previousData.repositories.data : [];
  let isNotChanged: boolean = true;

  if (isArrayPreviousDataRepositories && newRepos.length === oldRepos.length) {
    for (const item1 of newRepos) {
      if ((!item1.uid) || oldRepos.findIndex((item2: GitHubRepositoryModel) => item1.uid === item2.uid) === -1) {
        isNotChanged = false;
        break;
      }
    }
  } else {
    isNotChanged = false;
  }

  if (isNotChanged) {
    return null;
  }

  const result: GitHubRepositoryModel[] = newRepos.filter((item: GitHubRepositoryModel) => item && item.id !== null && item.id !== undefined);
  const uids: string[] = [];

  if (isArrayPreviousDataRepositories) {
    result.forEach((item1: GitHubRepositoryModel) => {
      const found: GitHubRepositoryModel = oldRepos.find((item2: GitHubRepositoryModel) => item1.id === item2.id);
      if (found && found.uid) {
        item1.uid = found.uid;
      }
    });
  }

  for (const item of result) {
    if (!item.uid) {
      const exitsRepoUid: string = await RepositoryModel.getRepositoryUidById(item.id);
      if (exitsRepoUid) {
        item.uid = exitsRepoUid;
      } else {
        item.uid = uuid();
      }
    }
    uids.push(item.uid);
  }

  return {
    repositories: {
      ...newData.repositories,
      data: result,
      uids,
    },
  };
}

export const onUpdateUser: any = firestore
  .document('users/{userUid}')
  .onUpdate(async (change: Change<DocumentSnapshot>, context: EventContext) => {

    try {
      const newData: DocumentData = change.after.data();
      const previousData: DocumentData = change.before.data();

      const result: any = await updateRepositories(newData, previousData);

      // Then return a promise of a set operation to update the count
      return result ? change.after.ref.update(result) : null;
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }

  });
