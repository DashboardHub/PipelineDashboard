import { RepositoryModel } from '../models/index.model';
import { DocumentData, DocumentReference } from './../client/firebase-admin';
import { GitHubClientDelete } from './../client/github';
import { Logger } from './../client/logger';

export interface DeleteGitWebhookRepositoryInput {
  token: string;
  data: { uid?: string, id?: number };
}

export const onDeleteGitWebhookRepository: any = async (token: string, data: { uid?: string, id?: number }) => {
  let repository: DocumentData;
  let repositoryRef: DocumentReference;

  if (!(data && (data.uid || data.id))) {
    Logger.error('Invalid input data!');
    return null;
  }

  if (data.uid) {
    repositoryRef = RepositoryModel.getRepositoryReference(data.uid);
    repository = (await repositoryRef.get()).data();
  } else if (data.id) {
    repository = await RepositoryModel.getRepositoryById(data.id);
    repositoryRef = RepositoryModel.getRepositoryReference(repository.uid);
  }

  try {
    if (repository && repository.projects && repository.projects.length === 1 && repository.webhook) {
      await deleteWebhook(repository.fullName, repository.webhook.id, token);
      repository.webhook = null;
      await repositoryRef.update(repository);
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
