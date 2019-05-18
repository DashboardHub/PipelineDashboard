import { GitHubUserInput, GitHubUserMapper, GitHubUserModel } from './user.mapper';

export interface GitHubReleaseInput {
  id: string;
  name: string;
  body: string;
  author: GitHubUserInput;
  published_at: Date;
}

export interface GitHubReleaseModel {
  uid: string;
  title: string;
  description: string;
  owner: GitHubUserModel;
  createdOn: Date;
}

export class GitHubReleaseMapper {
  static import(input: GitHubReleaseInput): GitHubReleaseModel {
    return {
      uid: input.id,
      title: input.name,
      description: input.body,
      owner: GitHubUserMapper.import(input.author),
      createdOn: input.published_at,
    };
  }
}
