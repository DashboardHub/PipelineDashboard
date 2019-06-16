import { GitHubUserInput, GitHubUserMapper, GitHubUserModel } from './index.mapper';

export interface GitHubContributorInput {
  author: GitHubUserInput;
  total: number;
}

export interface GitHubContributorModel {
  owner: GitHubUserModel;
  total: number;
}

export class GitHubContributorMapper {
  static import(input: GitHubContributorInput): GitHubContributorModel {
    return {
      owner: GitHubUserMapper.import(input.author),
      total: input.total,
    };
  }
}
