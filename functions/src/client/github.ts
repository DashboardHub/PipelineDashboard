import { delete as del, get, post } from 'request-promise-native';

export async function GitHubClient<T>(uri: string, token: string): Promise<T> {
  return <T>await get({
    uri: `https://api.github.com${uri}`,
    headers: {
      'User-Agent': 'DashboardHub',
      'Authorization': `token ${token}`,
    },
    json: true,
  });
};

export async function GitHubClientPost<T>(uri: string, token: string, body: any): Promise<T> {
  return <T>await post({
    uri: `https://api.github.com${uri}`,
    headers: {
      'User-Agent': 'DashboardHub',
      'Authorization': `token ${token}`,
    },
    json: true,
    body: body,
  });
};

export async function GitHubClientDelete<T>(uri: string, token: string): Promise<T> {
  return <T>await del({
    uri: `https://api.github.com${uri}`,
    headers: {
      'User-Agent': 'DashboardHub',
      'Authorization': `token ${token}`,
    },
  });
};
