// Third party modules
import { firestore, Change, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { DocumentData, DocumentSnapshot, FirebaseAdmin, WriteResult } from './../client/firebase-admin';

export const onUpdateProjectRepositories: any = firestore
  .document('projects/{projectUid}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {

    try {
      const newData: DocumentData = change.after.data();
      const previousData: DocumentData = change.before.data();
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

      for (const repositoryUid of add) {
        const repo: Promise<WriteResult> = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).get()
          .then((repoSnapshot: DocumentSnapshot) => {
            const repoData: DocumentData = repoSnapshot.data();
            if (Array.isArray(repoData.projects)) {
              const foundIndex: number = repoData.projects.findIndex((element: string) => element === context.params.projectUid);
              if (foundIndex === -1) {
                repoData.projects.push(context.params.projectUid);
              }
            } else {
              repoData.projects = [context.params.projectUid];
            }

            return FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).update(repoData);
          });

        promiseList.push(repo);
      }

      for (const repositoryUid of remove) {
        const repo: Promise<WriteResult> = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).get()
          .then((repoSnapshot: DocumentSnapshot) => {
            const repoData: DocumentData = repoSnapshot.data();
            if (Array.isArray(repoData.projects)) {
              const foundIndex: number = repoData.projects.findIndex((element: string) => element === context.params.projectUid);
              if (foundIndex > -1) {
                repoData.projects.splice(foundIndex, 1);
              }
            } else {
              repoData.projects = [];
            }

            return FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).set(repoData, { merge: true });
          });

        promiseList.push(repo);
      }

      return Promise.all(promiseList);

    } catch (err) {
      console.log(err)
      throw err;
    }

  });
