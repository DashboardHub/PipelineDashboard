import axios from 'axios';

export interface GitHubResponse<T> {
    data: T;
}

export const GitHubClient: any = (token: string) => axios.create({
    baseURL: 'https://api.github.com',
    timeout: 1000,
    headers: {
        'User-Agent': 'DashboardHub',
        Authorization: `token ${token}`
    }
});
