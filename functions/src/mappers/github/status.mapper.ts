export interface BuildTimes {
  context: string;
  time: number;
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
  createdAt: string;
  updatedAt: string;
}

export class GitHubPullRequestStatusMapper {
  static import(input: GitHubPullRequestStatusInput): GitHubPullRequestStatusModel {
    return {
      id: input.id,
      state: input.state,
      context: input.context,
      createdAt: input.created_at,
      updatedAt: input.updated_at,
    };
  }
}
