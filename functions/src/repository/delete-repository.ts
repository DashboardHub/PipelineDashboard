// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { RepositoryModel } from '../models/index.model';
import { DocumentData, DocumentSnapshot, FieldPath, FirebaseAdmin, QuerySnapshot } from './../client/firebase-admin';
import { deleteWebhook } from './delete-git-webhook-repository';
import { deleteRepoBuilds } from './pull-request';

async function deleteWebhookRepository(repositoryUid: string, repository: RepositoryModel): Promise<void> {
  Logger.info('deleteWebhookRepository');
  try {
    const usersRef: QuerySnapshot = await (FirebaseAdmin.firestore().collection('users').where(new FieldPath('repositories', 'uids'), 'array-contains', repositoryUid).get());
    let isDelete: boolean = false;

    if (repository.webhook && !usersRef.empty) {

      for (const element of usersRef.docs) {
        const userData: DocumentData = element.data();
        const githubToken: string = userData && userData.oauth ? userData.oauth.githubToken : null;
        if (githubToken) {
          try {
            if (repository && repository.webhook) {
              await deleteWebhook(repository.fullName, repository.webhook.id, githubToken);
              isDelete = true;
              break;
            }
          } catch (err) {
            Logger.error(err);
          }
        }
      }

    }

    if (isDelete === false) {
      Logger.info(`Webhook of repository '${repository.fullName}' did not delete`);
    }

  } catch (err) {
    Logger.info(`Webhook of repository '${repository.fullName}' did not delete`);
    Logger.error(err);
    throw new Error(err);
  }

};

export const onDeleteRepository: CloudFunction<DocumentSnapshot> = firestore
  .document('repositories/{repositoryUid}')
  .onDelete(async (projectSnapshot: DocumentSnapshot, context: EventContext) => {
    const repository: RepositoryModel = <RepositoryModel>projectSnapshot.data();
    await deleteWebhookRepository(context.params.repositoryUid, repository);
    await deleteRepoBuilds(context.params.repositoryUid);
  });
