// Third party modules
import { firestore } from 'firebase-admin';

// Dashboard hub firebase functions mappers/models
import { GitHubUserInput, GitHubUserMapper, GitHubUserModel } from './user.mapper';

export interface GitHubPullRequestInput {
  id: string;
  html_url: string;
  state: string;
  title: string;
  body: string;
  number: number;
  user: GitHubUserInput
  assignees: GitHubUserInput[];
  requested_reviewers: GitHubUserInput[];
  created_at: firestore.Timestamp;
  updated_at: firestore.Timestamp;
}

export interface GitHubPullRequestModel {
  uid: string;
  url: string;
  state: string;
  title: string;
  description: string;
  number: number;
  owner: GitHubUserModel;
  assignees: GitHubUserModel[];
  reviewers: GitHubUserModel[];
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;
}

export class GitHubPullRequestMapper {
  static import(input: GitHubPullRequestInput): GitHubPullRequestModel {
    return {
      uid: input.id,
      url: input.html_url,
      state: input.state,
      title: input.title,
      description: input.body,
      number: input.number,
      owner: GitHubUserMapper.import(input.user),
      assignees: input.assignees.map((assignee: GitHubUserInput) => GitHubUserMapper.import(assignee)),
      reviewers: input.requested_reviewers.map((reviewer: GitHubUserInput) => GitHubUserMapper.import(reviewer)),
      createdOn: input.created_at,
      updatedOn: input.updated_at,
    };
  }
}
