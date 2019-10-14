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
  created_at: string;
  updated_at: string;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
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
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;
  comments: number;
  reviewComments: number;
  maintainerCanModify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changedFiles: number;
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
      createdOn: firestore.Timestamp.fromDate(new Date(input.created_at)),
      updatedOn: firestore.Timestamp.fromDate(new Date(input.updated_at)),
      comments: input.comments,
      reviewComments: input.review_comments,
      maintainerCanModify: input.maintainer_can_modify,
      commits: input.commits,
      additions: input.additions,
      deletions: input.deletions,
      changedFiles: input.changed_files,
    };
  }
}
