import { GitHubEventModel } from './event.mapper';

export interface GitHubUserInput {
  login: string;
  avatar_url: string;
}

export interface GitHubUserModel {
  username: string;
  avatarUrl: string;
}

export interface GitHubUserStatsModel {
  name?: string;
  username: string;
  avatarUrl: string;
  github: {
    repository: {
      total: number;
    },
    activity: {
      latest: GitHubEventModel;
    }
  };
  lastUpdated: Date;
}

export class GitHubUserMapper {
  static import(input: GitHubUserInput): GitHubUserModel {
    return {
      username: input.login,
      avatarUrl: input.avatar_url,
    };
  }
}
