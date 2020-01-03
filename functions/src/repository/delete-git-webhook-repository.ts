// Dashboard hub firebase functions models/mappers
import { RepositoryModel } from '../models/index.model';
import { DocumentData, DocumentReference, DocumentSnapshot, FirebaseAdmin, Query, QuerySnapshot, Transaction } from './../client/firebase-admin';
import { GitHubClientDelete } from './../client/github';
import { Logger } from './../client/logger';

export interface DeleteGitWebhookRepositoryInput {
  token: string;
  data: { uid?: string, id?: number };
}

export const onDeleteGitWebhookRepository: any = async (token: string, data: { uid?: string, id?: number }) => {

  if (!(data && (data.uid || data.id))) {
    Logger.error('Invalid input data!');
    return null;
  }

  if (data.uid) {
    const repositoryRef: DocumentReference = RepositoryModel.getRepositoryReference(data.uid);

    await FirebaseAdmin.firestore().runTransaction((t: Transaction) => {

      return t.get(repositoryRef)
        .then((snap: DocumentSnapshot) => {
          const repository: DocumentData = snap.data();

          if (repository && repository.webhook) {
            return deleteWebhook(repository.fullName, repository.webhook.id, token)
              .then(() => {
                repository.webhook = null;
                Logger.info(`Webhook removed for ${repository.fullName}`);

                return repositoryRef.update(repository);
              })
              .catch((error: any) => {
                Logger.info(`No Webhook for ${repository.fullName}`);
                Logger.error(error);
                return repository;
              });
          }
          Logger.info(`No found repository (uid = ${data.uid}) or webhook`);
          return null;
        });

    });

  } else if (data.id) {
    const query: Query = RepositoryModel.getRepositoryReferenceById(data.id);

    await FirebaseAdmin.firestore().runTransaction((t: Transaction) => {

      return t.get(query)
        .then((snap: QuerySnapshot) => {
          const repositoryRef: DocumentReference = snap.docs.shift().ref;
          const repository: DocumentData = snap.docs.shift().data();

          if (repository && repository.webhook) {
            return deleteWebhook(repository.fullName, repository.webhook.id, token)
              .then(() => {
                repository.webhook = null;
                Logger.info(`Webhook removed for ${repository.fullName}`);

                return repositoryRef.update(repository);
              })
              .catch((error: any) => {
                Logger.info(`No Webhook for ${repository.fullName}`);
                Logger.error(error);
                return repositoryRef;
              });
          }
          Logger.info(`No found repository (id = ${data.id}) or webhook`);
          return null;
        });

    });
  }

};


export function deleteWebhook(repositoryFullName: string, webhookId: number, token: string): Promise<void> {
  return GitHubClientDelete<void>(`/repos/${repositoryFullName}/hooks/${webhookId}`, token);
}
