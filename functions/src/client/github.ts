import { get } from 'request-promise-native';

export async function GitHubClient<T>(uri: string, token: string): Promise<T> {
    return <T> await get({
        uri: `https://api.github.com${uri}`,
        headers: {
            'User-Agent': 'DashboardHub',
            'Authorization': `token ${token}`,
        },
        json: true,
    });
};
