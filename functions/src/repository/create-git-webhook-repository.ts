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

    const webhook: GitHubRepositoryWebhookModel = await getWebhook(repository.fullName, token);

    repository.webhook = webhook;
    await repositorySnapshot.update(repository);

    Logger.info({ webhook });

    return repository;
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }
};


export function createWebhook(repositoryUid: string, token: string): Promise<GitHubRepositoryWebhookResponse> {
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
  return GitHubClientPost<GitHubRepositoryWebhookResponse>(`/repos/${repositoryUid}/hooks`, token, body);
}


export async function getWebhook(repositoryUid: string, token: string): Promise<GitHubRepositoryWebhookModel> {

  const exist: GitHubRepositoryWebhookResponse = await findWebhook(repositoryUid, token);

  if (exist) {
    return GitHubRepositoryWebhookMapper.import(exist);
  }
  return GitHubRepositoryWebhookMapper.import(await createWebhook(repositoryUid, token));
}
