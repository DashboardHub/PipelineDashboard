import { DocumentData, DocumentReference, FirebaseAdmin } from './../client/firebase-admin';
import { GitHubClientDelete } from './../client/github';
import { Logger } from './../client/logger';

export interface DeleteGitWebhookRepositoryInput {
  token: string;
  repositoryUid: string;
}

export const onDeleteGitWebhookRepository: any = async (token: string, repositoryUid: string) => {
  const repositorySnapshot: DocumentReference = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid);
  const repository: DocumentData = (await repositorySnapshot.get()).data();

  try {
    if (repository.projects && repository.projects.length === 1 && repository.webhook) {
      await deleteWebhook(repository.fullName, repository.webhook.id, token);
      repository.webhook = null;
      await repositorySnapshot.update(repository);
    }

    Logger.info(`Webhook removed for ${repository.fullName}`);

    return repository;
  } catch (error) {
    Logger.info(`No Webhook for ${repository.fullName}`);
    Logger.error(error);
    return repository;
  }
};


export function deleteWebhook(repositoryFullName: string, webhookId: number, token: string): Promise<void> {
  return GitHubClientDelete<void>(`/repos/${repositoryFullName}/hooks/${webhookId}`, token);
}
