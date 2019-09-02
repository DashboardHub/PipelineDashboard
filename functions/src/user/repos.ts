// Third party modules
import * as firebase from 'firebase-admin';

// Dashboard hub firebase functions mappers
import { DocumentReference, FirebaseAdmin, WriteBatch } from './../client/firebase-admin';
import { GitHubClient } from './../client/github';
import { Logger } from './../client/logger';
import { GitHubRepositoryInput, GitHubRepositoryMapper, GitHubRepositoryModel } from './../mappers/github/repository.mapper';

export interface ReposInput {
  token: string;
}

export const getUserRepos: any = async (token: string, uid: string) => {
  const batch: WriteBatch = FirebaseAdmin.firestore().batch();
  const userRef: DocumentReference = FirebaseAdmin.firestore().collection('users').doc(uid);
  let repositories: GitHubRepositoryInput[] = [];
  try {
    repositories = await GitHubClient<GitHubRepositoryInput[]>('/user/repos?visibility=public&affiliation=owner', token);
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }

  const mappedRepos: GitHubRepositoryModel[] = repositories.map((repository: GitHubRepositoryInput) => GitHubRepositoryMapper.import(repository));

  Logger.info({
    user: uid,
    imported: {
      repos: mappedRepos.length || 0,
    },
  });

  await batch
    .update(userRef, {
      repositories: {
        lastUpdated: firebase.firestore.Timestamp.fromDate(new Date()),
        data: mappedRepos,
      },
    });

  await batch.commit();

  return mappedRepos;
};
