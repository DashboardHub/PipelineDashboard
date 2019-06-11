// Third party modules
import * as firebase from 'firebase-admin';
import { FirebaseAdmin } from './../client/firebase-admin';

// Dashboard hub firebase functions mappers
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
        lastUpdated: firebase.firestore.Timestamp.fromDate(new Date()) ,
        data: mappedRepos,
      },
    }, { merge: true });

  return mappedRepos;
};
