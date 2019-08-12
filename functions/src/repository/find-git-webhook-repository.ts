import { enviroment } from '../environments/environment';
import { GitHubRepositoryWebhookResponse } from '../mappers/github/webhook.mapper';
import { GitHubClient } from './../client/github';


export function listWebhook(repositoryUid: string, token: string): Promise<GitHubRepositoryWebhookResponse[]> {
  return GitHubClient<GitHubRepositoryWebhookResponse[]>(`/repos/${repositoryUid}/hooks`, token);
}


export async function findWebhook(repositoryUid: string, token: string): Promise<GitHubRepositoryWebhookResponse> {
  const list: GitHubRepositoryWebhookResponse[] = await listWebhook(repositoryUid, token);

  return list.find((elem: GitHubRepositoryWebhookResponse) => elem && elem.config && elem.config.url === enviroment.githubWebhook.url)
}
