import { firestore } from 'firebase-admin';

export interface BuildTimes {
  context: string;
  time: number;
  createdAt: firestore.Timestamp;
}

export interface GitHubPullRequestStatusInput {
  id: number;
  state: string;
  context: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubPullRequestStatusModel {
  id: number;
  state: string;
  context: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export class GitHubPullRequestStatusMapper {
  static import(input: GitHubPullRequestStatusInput): GitHubPullRequestStatusModel {
    return {
      id: input.id,
      state: input.state,
      context: input.context,
      createdAt: firestore.Timestamp.fromDate(new Date(input.created_at)),
      updatedAt: firestore.Timestamp.fromDate(new Date(input.updated_at)),
    };
  }
}
