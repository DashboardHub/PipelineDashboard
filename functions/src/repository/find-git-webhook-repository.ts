import { enviroment } from '../environments/environment';
import { GitHubRepositoryWebhookResponse } from '../mappers/github/webhook.mapper';
import { GitHubClient } from './../client/github';


export function listWebhook(repositoryFullName: string, token: string): Promise<GitHubRepositoryWebhookResponse[]> {
  return GitHubClient<GitHubRepositoryWebhookResponse[]>(`/repos/${repositoryFullName}/hooks`, token);
}


export async function findWebhook(repositoryFullName: string, token: string): Promise<GitHubRepositoryWebhookResponse> {
  const list: GitHubRepositoryWebhookResponse[] = await listWebhook(repositoryFullName, token);

  return list.find((elem: GitHubRepositoryWebhookResponse) => elem && elem.config && elem.config.url === enviroment.githubWebhook.url)
}
