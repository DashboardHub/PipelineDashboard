// Third party modules
import { firestore } from 'firebase-admin';

import { enviroment } from '../environments/environment';
import { GitHubRepositoryWebhookRequestCreate, GitHubRepositoryWebhookResponse } from '../mappers/github/webhook.mapper';
import { DocumentData, DocumentReference, FirebaseAdmin } from './../client/firebase-admin';
import { GitHubClientPost } from './../client/github';
import { Logger } from './../client/logger';

export interface CreateGitWebhookRepositoryInput {
  token: string;
  repositoryUid: string;
}

export const onCreateGitWebhookRepository: any = async (token: string, repositoryUid: string) => {
  try {
    const repositorySnapshot: DocumentReference = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid) 
    const repository: DocumentData = (await FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).get()).data();

    repository.webhook = await createWebhook(repository, token);
    await repositorySnapshot.update(repository);

    return repository;
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }
};


function createWebhook(repository: DocumentData, token: string): Promise<GitHubRepositoryWebhookResponse> {
  const body: GitHubRepositoryWebhookRequestCreate = {
    // name: enviroment.githubWebhook.name,
    name: 'web',
    active: true,
    events: [
      'push',
      'pull_request',
    ],
    config: {
      url: enviroment.githubWebhook.url,
      content_type: 'json',
      insecure_ssl: '0',
    },
  }
  return GitHubClientPost<GitHubRepositoryWebhookResponse>(`/repos/${repository.fullName}/hooks`, token, body);
}
