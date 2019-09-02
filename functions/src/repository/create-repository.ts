// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { DocumentData, DocumentSnapshot, FirebaseAdmin, QueryDocumentSnapshot, WriteResult } from './../client/firebase-admin';

async function addProjects(repositoryUid: string, repo: DocumentData): Promise<boolean> {
  const projects: QueryDocumentSnapshot[] = (await FirebaseAdmin.firestore().collection('projects').where('repositories', 'array-contains', repositoryUid).get()).docs;
  if (!Array.isArray(repo.projects)) {
    repo.projects = [];
  }

  for (const project of projects) {
    repo.projects.push(project.id);
  }
  /*
  const result: Promise<WriteResult>[] = [];
  (await FirebaseAdmin.firestore().collection('projects').get())
    .forEach((project: QueryDocumentSnapshot) => {
      const projectData: DocumentData = project.data();
      if (!Array.isArray(projectData.repositories)) {
        return;
      }
      const foundIndex: number = projectData.repositories.findIndex((item: { id: number, fullName: string }) => item && item.id && item.id === repo.id);
      if (foundIndex > -1) {
        repo.projects.push(project.id);
        projectData.repositories[foundIndex].uid = repositoryUid;
        result.push(project.ref.update({ repositories: projectData.repositories }));
      }
    });
    */

  if (repo.projects.length > 0) {
    return true;
  }

  return false;
}

export const onCreateRepository: CloudFunction<DocumentSnapshot> = firestore
  .document('repositories/{repositoryUid}')
  .onCreate(async (repositorySnapshot: DocumentSnapshot, context: EventContext) => {
    try {
      const newData: DocumentData = repositorySnapshot.data();
      const isNeedUpdate: boolean = await addProjects(context.params.repositoryUid, newData);
      if (isNeedUpdate) {
        await repositorySnapshot.ref.update(newData);
      }
    } catch (err) {
      Logger.error(err);
      throw new Error(err);
    }
  });
