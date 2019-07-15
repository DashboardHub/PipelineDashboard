import { enviroment } from '../environments/environment';
import { GitHubRepositoryWebhookMapper, GitHubRepositoryWebhookModel, GitHubRepositoryWebhookRequestCreate, GitHubRepositoryWebhookResponse } from '../mappers/github/webhook.mapper';
import { DocumentData, DocumentReference, FirebaseAdmin } from './../client/firebase-admin';
import { GitHubClientPost } from './../client/github';
import { Logger } from './../client/logger';
import { findWebhook } from './find-git-webhook-repository';

export interface CreateGitWebhookRepositoryInput {
  token: string;
  repositoryUid: string;
}

export const onCreateGitWebhookRepository: any = async (token: string, repositoryUid: string) => {
  try {
    const repositorySnapshot: DocumentReference = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid);
    const repository: DocumentData = (await repositorySnapshot.get()).data();

    let webhook: GitHubRepositoryWebhookModel;

    const exist: GitHubRepositoryWebhookResponse = await findWebhook(repository, token);

    if (exist) {
      webhook = GitHubRepositoryWebhookMapper.import(exist);
    } else {
      webhook = GitHubRepositoryWebhookMapper.import(await createWebhook(repository, token));
    }

    repository.webhook = webhook;
    await repositorySnapshot.update(repository);

    return repository;
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }
};


export function createWebhook(repository: DocumentData, token: string): Promise<GitHubRepositoryWebhookResponse> {
  const body: GitHubRepositoryWebhookRequestCreate = {
    // name: enviroment.githubWebhook.name,
    name: 'web',
    active: true,
    events: enviroment.githubWebhook.events,
    config: {
      url: enviroment.githubWebhook.url,
      content_type: 'json',
      insecure_ssl: '0',
    },
  }
  return GitHubClientPost<GitHubRepositoryWebhookResponse>(`/repos/${repository.fullName}/hooks`, token, body);
}
