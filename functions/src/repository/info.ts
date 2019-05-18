import { FirebaseAdmin } from './../client/firebase-admin';
import { GitHubReleaseInput } from './../mappers/github/release.mapper';
import { GitHubRepositoryModel } from './../mappers/github/repository.mapper';

import { GitHubEventInput, GitHubEventMapper, GitHubPullRequestInput, GitHubPullRequestMapper, GitHubReleaseMapper, GitHubRepositoryInput, GitHubRepositoryMapper } from '../mappers/github/index.mapper';
import { GitHubClient } from './../client/github';

export interface RepositoryInfoInput {
    token: string;
    fullName: string;
}

export const getRepositoryInfo: any = async (token: string, fullName: string) => {
    const data: [GitHubRepositoryInput, GitHubPullRequestInput[], GitHubEventInput[], GitHubReleaseInput[]] = await Promise.all([
        GitHubClient<GitHubRepositoryInput>(`/repos/${fullName}`, token),
        GitHubClient<GitHubPullRequestInput[]>(`/repos/${fullName}/pulls?state=open`, token),
        GitHubClient<GitHubEventInput[]>(`/repos/${fullName}/events`, token),
        GitHubClient<GitHubReleaseInput[]>(`/repos/${fullName}/releases`, token),
    ]);
    const mappedData: GitHubRepositoryModel = {
        ...GitHubRepositoryMapper.import(data[0], 'all'),
        pullRequests: data[1].map((pullrequest: GitHubPullRequestInput) => GitHubPullRequestMapper.import(pullrequest)),
        events: data[2].map((event: GitHubEventInput) => GitHubEventMapper.import(event)),
        releases: data[3].map((release: GitHubReleaseInput) => GitHubReleaseMapper.import(release)),
    }

    await FirebaseAdmin
            .firestore()
            .collection('repositories')
            .doc(GitHubRepositoryMapper.fullNameToUid(fullName))
            .set(mappedData, { merge: true });

    return mappedData;
};
