import { enviroment } from '../environments/environment';
import { GitHubRepositoryWebhookMapper, GitHubRepositoryWebhookModel, GitHubRepositoryWebhookRequestCreate, GitHubRepositoryWebhookResponse } from '../mappers/github/webhook.mapper';
import { RepositoryModel } from '../models/index.model';
import { DocumentData, DocumentReference } from './../client/firebase-admin';
import { GitHubClientPost } from './../client/github';
import { Logger } from './../client/logger';
import { deleteWebhook } from './delete-git-webhook-repository';
import { findWebhook } from './find-git-webhook-repository';

export interface CreateGitWebhookRepositoryInput {
  token: string;
  repositoryUid: string;
}

export const onCreateGitWebhookRepository: any = async (token: string, repositoryUid: string) => {
  try {
    const repositorySnapshot: DocumentReference = RepositoryModel.getRepositoryReference(repositoryUid);
    const repository: DocumentData = (await repositorySnapshot.get()).data();

    const webhook: GitHubRepositoryWebhookModel = await getWebhook(repository.fullName, token);

    repository.webhook = webhook;
    await repositorySnapshot.update(repository);

    Logger.info(webhook ? 'Webhook created' : 'Webhook empty');

    return repository;
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }
};


export function createWebhook(repositoryFullName: string, token: string): Promise<GitHubRepositoryWebhookResponse> {
  const body: GitHubRepositoryWebhookRequestCreate = {
    // name: enviroment.githubWebhook.name,
    name: 'web',
    active: true,
    events: enviroment.githubWebhook.events,
    config: {
      url: enviroment.githubWebhook.url,
      secret: enviroment.githubWebhook.secret,
      content_type: enviroment.githubWebhook.content_type,
      insecure_ssl: enviroment.githubWebhook.insecure_ssl,
    },
  }
  return GitHubClientPost<GitHubRepositoryWebhookResponse>(`/repos/${repositoryFullName}/hooks`, token, body);
}


export async function getWebhook(repositoryFullName: string, token: string): Promise<GitHubRepositoryWebhookModel> {

  const exist: GitHubRepositoryWebhookResponse = await findWebhook(repositoryFullName, token);

  if (exist) {
    let isEqual: boolean = exist.events.length === enviroment.githubWebhook.events.length;

    if (isEqual) {

      for (const existItem of exist.events) {
        if (enviroment.githubWebhook.events.findIndex((envItem: string) => existItem === envItem) === -1) {
          isEqual = false;
          break;
        }
      }

      if (isEqual) {
        return GitHubRepositoryWebhookMapper.import(exist);
      }
    }
    await deleteWebhook(repositoryFullName, exist.id, token);
  }

  return GitHubRepositoryWebhookMapper.import(await createWebhook(repositoryFullName, token));
}
