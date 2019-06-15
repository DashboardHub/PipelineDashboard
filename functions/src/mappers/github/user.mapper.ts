// Third party modules
import { firestore } from 'firebase-admin';

// Dashboard hub firebase functions models
import { GitHubEventModel } from './event.mapper';

export interface GitHubUserInput {
  login: string;
  avatar_url: string;
  url: string;
}

export interface GitHubUserModel {
  username: string;
  avatarUrl: string;
  url: string;
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
  lastUpdated: firestore.Timestamp;
}

export class GitHubUserMapper {
  static import(input: GitHubUserInput): GitHubUserModel {
    return {
      username: input.login,
      avatarUrl: input.avatar_url,
      url: input.url,
    };
  }
}
