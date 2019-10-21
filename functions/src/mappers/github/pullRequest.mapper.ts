import { firestore } from 'firebase-admin';

// Dashboard mappers/models
import { GitHubUserInput, GitHubUserMapper, GitHubUserModel } from './user.mapper';

export interface GitHubPullRequestInput {
  id: number;
  html_url: string;
  state: string;
  title: string;
  body: string;
  number: number;
  user: GitHubUserInput
  assignees: GitHubUserInput[];
  requested_reviewers: GitHubUserInput[];
  statuses_url: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubPullRequestModel {
  uid: number;
  url: string;
  state: string;
  title: string;
  description: string;
  id: number;
  owner: GitHubUserModel;
  assignees: GitHubUserModel[];
  reviewers: GitHubUserModel[];
  statusesUrl: string;
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
      id: input.number,
      owner: GitHubUserMapper.import(input.user),
      assignees: input.assignees.map((assignee: GitHubUserInput) => GitHubUserMapper.import(assignee)),
      reviewers: input.requested_reviewers.map((reviewer: GitHubUserInput) => GitHubUserMapper.import(reviewer)),
      statusesUrl: input.statuses_url,
      createdOn: firestore.Timestamp.fromDate(new Date(input.created_at)),
      updatedOn: firestore.Timestamp.fromDate(new Date(input.updated_at)),
    };
  }
}
