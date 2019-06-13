import { GitHubEventModel } from './event.mapper';
import { GitHubIssueModel } from './issues.mapper';
import { GitHubPullRequestModel } from './pullRequest.mapper';
import { GitHubReleaseModel } from './release.mapper';

export interface GitHubRepositoryInput {
  id: string;
  uid: string;
  name?: string;
  full_name?: string;
  description?: string;
  url: string;
  private: boolean;
  fork: string;
}

export interface GitHubRepositoryModel {
  id: string;
  uid: string;
  fullName?: string;
  description?: string;
  url: string;
  private: boolean;
  fork: string;
  pullRequests?: GitHubPullRequestModel[];
  events?: GitHubEventModel[];
  releases?: GitHubReleaseModel[];
  issues?: GitHubIssueModel[];
}

export class GitHubRepositoryMapper {
  static fullNameToUid(fullName: string) {
    return fullName.replace('/', '+');
  }

  static import(input: GitHubRepositoryInput, type: 'minimum' | 'all' | 'event' = 'minimum'): GitHubRepositoryModel {
    const output: any = {};

    switch (type) {
      case 'all':
        output.fork = input.fork;
        break;
      case 'event':
        output.id = input.id;
        output.fullName = input.name;
        output.url = input.url;
        break;
      case 'minimum':
        output.uid = GitHubRepositoryMapper.fullNameToUid(input.full_name);
        output.fullName = input.full_name;
        output.description = input.description;
        output.private = input.private;
        break;
    }

    return output;
  }
}
