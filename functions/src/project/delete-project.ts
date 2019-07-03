// Third party modules
import * as admin from 'firebase-admin';
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { FirebaseAdmin } from './../client/firebase-admin';


export declare type DocumentSnapshot = admin.firestore.DocumentSnapshot;
export declare type DocumentData = admin.firestore.DocumentData;
export declare type WriteResult = admin.firestore.WriteResult;

export const onDeleteProjectRepositories: CloudFunction<DocumentSnapshot> = firestore
  .document('projects/{projectUid}')
  .onDelete(async (projectSnapshot: DocumentSnapshot, context: EventContext) => {

    try {
      const project: DocumentData = projectSnapshot.data();

      if (Array.isArray(project.repositories) && project.repositories.length > 0) {

        const promiseList: Promise<WriteResult>[] = [];

        for (const repositoryUid of project.repositories) {
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

              return FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).update(repoData);
            });

          promiseList.push(repo);
        }

        await Promise.all(promiseList);
      }

      return;

    } catch (err) {
      console.log(err)
      throw err;
    }

  });
