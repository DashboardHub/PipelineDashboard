import { FirebaseAdmin } from './../index';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

import { GitHubClient } from './../client/github';
import { GitHubRepositoryMapper, GitHubRepositoryInput, GitHubRepositoryModel } from './../mappers/github/repository.mapper';

interface Input {
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

export const findAllUserRepositories: functions.HttpsFunction = functions.https.onCall((input: Input, context: CallableContext) => getUserRepos(input.token, context.auth.uid));
