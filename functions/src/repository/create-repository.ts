// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { GitHubRepositoryModel } from '../mappers/github/index.mapper';
import { DocumentData, DocumentReference, DocumentSnapshot, FieldPath, FirebaseAdmin, Query, QueryDocumentSnapshot, QuerySnapshot, Transaction } from './../client/firebase-admin';

async function addProjects(repositoryUid: string, repo: DocumentData): Promise<boolean> {
  const projects: QueryDocumentSnapshot[] = (await FirebaseAdmin.firestore().collection('projects').where('repositories', 'array-contains', repositoryUid).get()).docs;
  if (!Array.isArray(repo.projects)) {
    repo.projects = [];
  }

  for (const project of projects) {
    repo.projects.push(project.id);
  }

  if (repo.projects.length > 0) {
    return true;
  }

  return false;
}

async function removeDublicateRepository(repositoryUid: string, repo: DocumentData, repoRef: DocumentReference): Promise<boolean> {
  const repoQuerySnap: QuerySnapshot = (await FirebaseAdmin.firestore().collection('repositories').where('id', '==', repo.id).where('uid', '<', repositoryUid).where('uid', '>', repositoryUid).get());
  if (repoQuerySnap.empty) {
    return true;
  } else {

    const existRepoUid: string = repoQuerySnap.docs.shift().id;

    // update repo data in user
    const usersRef: Query = FirebaseAdmin.firestore().collection('users').where(new FieldPath('repositories', 'uids'), 'array-contains', repositoryUid);
    await FirebaseAdmin.firestore().runTransaction((t: Transaction) => {
      return t.get(usersRef)
        .then((snap: QuerySnapshot) => {
          snap.forEach((element: QueryDocumentSnapshot) => {
            const userData: DocumentData = element.data();
            if (userData.repositories && Array.isArray(userData.repositories.data) && userData.repositories.data.length > 0) {
              const repos: GitHubRepositoryModel[] = userData.repositories.data;
              const uids: string[] = userData.repositories.uids;
              const foundIndexObj: number = repos.findIndex((item: GitHubRepositoryModel) => item.uid && item.uid === repositoryUid);
              const foundIndexUids: number = uids.findIndex((uid: string) => uid === repositoryUid);

              if (foundIndexObj > -1 && foundIndexUids > -1) {
                repos[foundIndexObj].uid = existRepoUid;
                uids[foundIndexUids] = existRepoUid;
                t.update(element.ref, { repositories: { ...userData.repositories, data: repos, uids } });
              }
            }
          });

        });
    });

    // update repo data in project
    const projectsRef: Query = FirebaseAdmin.firestore().collection('projects').where('repositories', 'array-contains', repositoryUid);
    await FirebaseAdmin.firestore().runTransaction((t: Transaction) => {
      return t.get(projectsRef)
        .then((snap: QuerySnapshot) => {
          snap.forEach((element: QueryDocumentSnapshot) => {
            const projectData: DocumentData = element.data();
            if (Array.isArray(projectData.repositories) && projectData.repositories.length > 0) {
              const uids: string[] = projectData.repositories;
              const foundIndex: number = uids.findIndex((uid: string) => uid === repositoryUid);

              if (foundIndex > -1) {
                uids[foundIndex] = existRepoUid;
                t.update(element.ref, { repositories: uids });
              }
            }
          });

        });
    });

    await repoRef.delete();
    return false;
  }
}

export const onCreateRepository: CloudFunction<DocumentSnapshot> = firestore
  .document('repositories/{repositoryUid}')
  .onCreate(async (repositorySnapshot: DocumentSnapshot, context: EventContext) => {
    try {
      const newData: DocumentData = repositorySnapshot.data();
      let isNeedUpdate: boolean = await removeDublicateRepository(context.params.repositoryUid, newData, repositorySnapshot.ref);
      isNeedUpdate = isNeedUpdate && await addProjects(context.params.repositoryUid, newData);

      if (isNeedUpdate) {
        await repositorySnapshot.ref.update(newData);
      }
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }
  });
