import { get } from 'request-promise-native';

export async function MonitorPing<T>(uri: string, token: string): Promise<T> {
  return <T>await get({
    uri: uri,
    headers: {
      'User-Agent': 'DashboardHub',
      'Authorization': `token ${token}`,
    },
    json: true,
    resolveWithFullResponse: true,
  });
};
