// Third party modules
import { firestore, Change, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { RepositoryModel } from '../models/index.model';
import { DocumentData, DocumentSnapshot, WriteResult } from './../client/firebase-admin';

async function updateRepositories(projectUid: string, newData: DocumentData, previousData: DocumentData): Promise<WriteResult[]> {
  const isArrayNewDataRepositories: boolean = Array.isArray(newData.repositories) && newData.repositories.length > 0;
  const isArrayPreviousDataRepositories: boolean = Array.isArray(previousData.repositories) && previousData.repositories.length > 0;

  let add: string[], remove: string[];
  const promiseList: Promise<WriteResult>[] = [];

  if (isArrayNewDataRepositories) {
    if (isArrayPreviousDataRepositories) {
      add = newData.repositories.filter((element: string) => previousData.repositories.findIndex((item: string) => element === item) === -1);
      remove = previousData.repositories.filter((element: string) => newData.repositories.findIndex((item: string) => element === item) === -1);
    } else {
      add = newData.repositories;
      remove = [];
    }
  } else {
    add = [];
    remove = isArrayPreviousDataRepositories ? previousData.repositories : [];
  }

  for (const item of add) {
    const repoData: DocumentData = (await RepositoryModel.getRepositoryReference(item).get()).data();

    if (Array.isArray(repoData.projects)) {
      const foundIndex: number = repoData.projects.findIndex((element: string) => element === projectUid);
      if (foundIndex === -1) {
        repoData.projects.push(projectUid);
      }
    } else {
      repoData.projects = [projectUid];
    }

    const repo: Promise<WriteResult> = RepositoryModel.getRepositoryReference(repoData.uid).update({projects: repoData.projects});
    promiseList.push(repo);
  }

  for (const item of remove) {
    const repoData: DocumentData = (await RepositoryModel.getRepositoryReference(item).get()).data();

    if (Array.isArray(repoData.projects)) {
      repoData.projects = repoData.projects.filter((element: string) => element !== projectUid);
    } else {
      repoData.projects = [];
    }

    const repo: Promise<WriteResult> = RepositoryModel.getRepositoryReference(repoData.uid).update({projects: repoData.projects});
    promiseList.push(repo);
  }

  return Promise.all(promiseList);
}

export const onUpdateProject: any = firestore
  .document('projects/{projectUid}')
  .onUpdate(async (change: Change<DocumentSnapshot>, context: EventContext) => {

    try {
      const newData: DocumentData = change.after.data();
      const previousData: DocumentData = change.before.data();

      return updateRepositories(context.params.projectUid, newData, previousData);
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }

  });
