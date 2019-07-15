// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { DocumentData, DocumentSnapshot, FirebaseAdmin, QueryDocumentSnapshot } from './../client/firebase-admin';

async function addProjects(repositoryUid: string, repo: DocumentData): Promise<boolean> {
  const projects: QueryDocumentSnapshot[] = (await FirebaseAdmin.firestore().collection('projects').where('repositories', 'array-contains', repositoryUid).get()).docs;

  if (!Array.isArray(repo.projects)) {
    repo.projects = [];
  }

  for (const project of projects) {
    repo.projects.push(project.id);
  }

  if (projects.length > 0) {
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
        return repositorySnapshot.ref.update(newData);
      }
      return newData;
    } catch (err) {
      console.log(err)
      throw err;
    }
  });
