// Third party modules
import { firestore } from 'firebase-admin';

import {
  GitHubEventInput, GitHubEventMapper,
  GitHubIssueInput, GitHubIssueMapper,
  GitHubPullRequestInput, GitHubPullRequestMapper,
  GitHubReleaseInput, GitHubReleaseMapper,
  GitHubRepositoryInput, GitHubRepositoryMapper, GitHubRepositoryModel
} from '../mappers/github/index.mapper';
import { FirebaseAdmin } from './../client/firebase-admin';
import { GitHubClient } from './../client/github';
import { Logger } from './../client/logger';

export interface RepositoryInfoInput {
  token: string;
  fullName: string;
}

export const getRepositoryInfo: any = async (token: string, fullName: string) => {
  let data: [
    GitHubRepositoryInput,
    GitHubPullRequestInput[],
    GitHubEventInput[],
    GitHubReleaseInput[],
    GitHubIssueInput[],
  ];
  let mappedData: GitHubRepositoryModel;

  try {
    data = await Promise.all([
      GitHubClient<GitHubRepositoryInput>(`/repos/${fullName}`, token),
      GitHubClient<GitHubPullRequestInput[]>(`/repos/${fullName}/pulls?state=open`, token),
      GitHubClient<GitHubEventInput[]>(`/repos/${fullName}/events`, token),
      GitHubClient<GitHubReleaseInput[]>(`/repos/${fullName}/releases`, token),
      GitHubClient<GitHubIssueInput[]>(`/repos/${fullName}/issues`, token),
    ]);
    mappedData = {
      ...GitHubRepositoryMapper.import(data[0], 'all'),
      pullRequests: data[1].map((pullrequest: GitHubPullRequestInput) => GitHubPullRequestMapper.import(pullrequest)),
      events: data[2].map((event: GitHubEventInput) => GitHubEventMapper.import(event)),
      releases: data[3].map((release: GitHubReleaseInput) => GitHubReleaseMapper.import(release)),
      issues: data[4].map((issue: GitHubIssueInput) => GitHubIssueMapper.import(issue)),
      updatedAt: firestore.Timestamp.fromDate(new Date()),
    };
  } catch (error) {
    Logger.error(error);
  }

  Logger.info({
    repository: fullName,
    imported: {
      pullRequests: mappedData.pullRequests.length || 0,
      events: mappedData.events.length || 0,
      releases: mappedData.releases.length || 0,
      issues: mappedData.issues.length || 0,
    },
  });

  await FirebaseAdmin
    .firestore()
    .collection('repositories')
    .doc(GitHubRepositoryMapper.fullNameToUid(fullName))
    .set(mappedData, { merge: true });

  return mappedData;
};
