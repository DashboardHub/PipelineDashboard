// Dashboard hub firebase functions mappers/models
import { GitHubUserInput, GitHubUserMapper, GitHubUserModel } from './user.mapper';

export interface GitHubReleaseInput {
  id: number;
  name: string;
  body: string;
  author: GitHubUserInput;
  html_url: string;
  published_at: string;
  prerelease: boolean;
}

export interface GitHubReleaseModel {
  uid: number;
  title: string;
  description: string;
  owner: GitHubUserModel;
  htmlUrl: string;
  createdOn: string;
  isPrerelease: boolean;
}

export class GitHubReleaseMapper {
  static import(input: GitHubReleaseInput): GitHubReleaseModel {
    return {
      uid: input.id,
      title: input.name,
      description: input.body,
      owner: GitHubUserMapper.import(input.author),
      htmlUrl: input.html_url,
      createdOn: input.published_at,
      isPrerelease: input.prerelease,
    };
  }

  public static sortReleaseList(releases: GitHubReleaseModel[]) {
    return releases.sort(
      (a: GitHubReleaseModel, b: GitHubReleaseModel): number => {
        const date1: Date = new Date(a.createdOn);
        const date2: Date = new Date(b.createdOn);
        return date2.getTime() - date1.getTime();
      }
    );
  }
}
