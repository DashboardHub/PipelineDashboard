import { get } from 'request-promise-native';

export interface PingResponse {
  statusCode: number;
  body: string;
}

export async function Ping<T>(uri: string): Promise<T> {
  return <T> await get({
    uri: uri,
    headers: {
      'User-Agent': 'DashboardHub',
    },
    json: true,
    resolveWithFullResponse: true,
  });
};
