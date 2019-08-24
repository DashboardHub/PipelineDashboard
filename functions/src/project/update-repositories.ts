// Third party modules
import { firestore, Change, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { ProjectModel } from '../models/index.model';
import { DocumentData, DocumentSnapshot, FirebaseAdmin, WriteResult } from './../client/firebase-admin';

export const onUpdateProjectRepositories: any = firestore
  .document('projects/{projectUid}')
  .onUpdate(async (change: Change<DocumentSnapshot>, context: EventContext) => {

    try {
      const newData: DocumentData = change.after.data();
      const previousData: DocumentData = change.before.data();
      const isArrayNewDataRepositories: boolean = Array.isArray(newData.repositories) && newData.repositories.length > 0;
      const isArrayPreviousDataRepositories: boolean = Array.isArray(previousData.repositories) && previousData.repositories.length > 0;

      let add: string[], remove: string[];
      const promiseList: Promise<WriteResult>[] = [];

      if (isArrayNewDataRepositories) {
        if (isArrayPreviousDataRepositories) {
          add = newData.repositories.filter((element: string) => previousData.repositories.find((item: string) => element === item));
          remove = previousData.repositories.filter((element: string) => newData.repositories.find((item: string) => element === item));
        } else {
          add = newData.repositories;
          remove = [];
        }
      } else {
        add = [];
        remove = isArrayPreviousDataRepositories ? previousData.repositories : [];
      }

      for (const repositoryUid of add) {
        const repoData: DocumentData = (await FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).get()).data();

        if (Array.isArray(repoData.projects)) {
          const project: ProjectModel = repoData.projects.find((element: string) => element === context.params.projectUid);
          if (project) {
            repoData.projects.push(context.params.projectUid);
          }
        } else {
          repoData.projects = [context.params.projectUid];
        }

        const repo: Promise<WriteResult> = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).update(repoData);
        promiseList.push(repo);
      }

      for (const repositoryUid of remove) {
        const repoData: DocumentData = (await FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).get()).data();

        if (Array.isArray(repoData.projects)) {
          repoData.projects = repoData.projects.filter((element: string) => element !== context.params.projectUid);
        } else {
          repoData.projects = [];
        }

        const repo: Promise<WriteResult> = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).set(repoData, { merge: true });
        promiseList.push(repo);
      }

      return Promise.all(promiseList);

    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }

  });
