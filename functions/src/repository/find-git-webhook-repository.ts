import { CallableContext } from 'firebase-functions/lib/providers/https';
import { enviroment } from '../environments/environment';
import { GitHubRepositoryWebhookResponse } from '../mappers/github/webhook.mapper';
import { DocumentData, DocumentReference, FirebaseAdmin } from './../client/firebase-admin';
import { GitHubClient } from './../client/github';
import { Logger } from './../client/logger';

export interface FindGitWebhookRepositoryInput {
  token: string;
  repositoryUid: string;
}

export const onFindGitWebhookRepository: any = async (token: string, repositoryUid: string) => {
  try {
    const repositorySnapshot: DocumentReference = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid);
    const repository: DocumentData = (await repositorySnapshot.get()).data();

    return await findWebhook(repository.fullName, token);
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }
};


export function listWebhook(repositoryUid: string, token: string): Promise<GitHubRepositoryWebhookResponse[]> {
  return GitHubClient<GitHubRepositoryWebhookResponse[]>(`/repos/${repositoryUid}/hooks`, token);
}


export async function findWebhook(repositoryUid: string, token: string): Promise<GitHubRepositoryWebhookResponse> {
  const list: GitHubRepositoryWebhookResponse[] = await listWebhook(repositoryUid, token);

  return list.find((elem: GitHubRepositoryWebhookResponse) => elem && elem.config && elem.config.url === enviroment.githubWebhook.url)
}
