// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { ProjectModel, RepositoryModel } from '../models/index.model';
import { deleteMonitorPings } from '../monitor/monitor';
import { DocumentData, DocumentReference, DocumentSnapshot, FirebaseAdmin, Transaction, WriteResult } from './../client/firebase-admin';

async function deleteProjectRepositories(projectUid: string, project: ProjectModel): Promise<void> {
  Logger.info('deleteProjectRepositories');
  try {
    if (Array.isArray(project.repositories) && project.repositories.length > 0) {
      for (const repositoryUid of project.repositories) {
        if (repositoryUid) {
          continue;
        }
        const repoRef: DocumentReference = RepositoryModel.getRepositoryReference(repositoryUid);

        await FirebaseAdmin.firestore().runTransaction((t: Transaction) => {
          return t.get(repoRef)
            .then((repo: DocumentSnapshot) => {
              const repoData: DocumentData = repo.data();

              if (Array.isArray(repoData.projects)) {
                repoData.projects = repoData.projects.filter((element: string) => element !== projectUid);
              } else {
                repoData.projects = [];
              }

              t.update(repoRef, { projects: repoData.projects });
            });
        });
      }
    }

  } catch (err) {
    Logger.error(err);
    throw new Error(err);
  }

};

export const deleteProjectPings: any = async (project: ProjectModel, isExpiredFlag: boolean): Promise<WriteResult[]> => {
  Logger.info('deleteProjectPings');
  try {
    if (Array.isArray(project.monitors) && project.monitors.length > 0) {
      const promises: Promise<WriteResult>[] = [];

      for (const monitor of project.monitors) {
        promises.push(deleteMonitorPings(project.uid, monitor.uid, isExpiredFlag))
      }
      return Promise.all(promises);
    }
    return Promise.all([]);

  } catch (err) {
    Logger.error(err);
    throw new Error(err);
  }
};

export const onDeleteProject: CloudFunction<DocumentSnapshot> = firestore
  .document('projects/{projectUid}')
  .onDelete(async (projectSnapshot: DocumentSnapshot, context: EventContext) => {
    const project: ProjectModel = <ProjectModel>projectSnapshot.data();
    deleteProjectPings(project);
    await deleteProjectRepositories(context.params.projectUid, project);
  });
