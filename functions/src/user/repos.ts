import { FirebaseAdmin } from './../index';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

import { GitHubClient, GitHubResponse } from './../client/github';
import { GitHubRepositoryMapper, GitHubRepositoryInput, GitHubRepositoryModel } from './../mappers/github/repository.mapper';

interface Input {
    token: string;
}

let repositories: GitHubRepositoryModel[];

export const getUserRepos: any = (token: string, uid: string) => GitHubClient(token).get('/user/repos')
    .then((response: GitHubResponse<GitHubRepositoryInput[]>) =>  repositories = response.data.map((repository: GitHubRepositoryInput) => GitHubRepositoryMapper.import(repository)))
    .then((mappedRepositories: GitHubRepositoryModel[]) => FirebaseAdmin
                                .firestore()
                                .collection('users')
                                .doc(uid)
                                .set({
                                    repositories: {
                                        lastUpdated: new Date(),
                                        data: mappedRepositories,
                                    }
                                }, { merge: true }))
    .then(() => repositories)

export const findAllUserRepositories: functions.HttpsFunction = functions.https.onCall((input: Input, context: CallableContext) => getUserRepos(input.token, context.auth.uid));
