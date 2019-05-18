import { FirebaseAdmin } from './../client/firebase-admin';

import { GitHubClient } from './../client/github';
import { GitHubRepositoryInput, GitHubRepositoryMapper, GitHubRepositoryModel } from './../mappers/github/repository.mapper';

export interface ReposInput {
    token: string;
}

export const getUserRepos: any = async (token: string, uid: string) => {
    const repositories: GitHubRepositoryInput[] = await GitHubClient<GitHubRepositoryInput[]>('/user/repos', token);
    const mappedRepos: GitHubRepositoryModel[] = repositories.map((repository: GitHubRepositoryInput) => GitHubRepositoryMapper.import(repository));

    await FirebaseAdmin
        .firestore()
        .collection('users')
        .doc(uid)
        .set({
            repositories: {
                lastUpdated: new Date(),
                data: mappedRepos,
            }
        }, { merge: true });

    return mappedRepos;
};
