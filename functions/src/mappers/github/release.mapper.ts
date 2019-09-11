import { firestore } from 'firebase-admin';

// Dashboard mappers/models
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
  createdOn: firestore.Timestamp;
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
      createdOn: firestore.Timestamp.fromDate(new Date(input.published_at)),
      isPrerelease: input.prerelease,
    };
  }

  public static sortReleaseList(releases: GitHubReleaseModel[]): GitHubReleaseModel[] {
    return releases
      .sort(
        (a: GitHubReleaseModel, b: GitHubReleaseModel): number => {
          // tslint:disable-next-line: triple-equals
          if (a.createdOn == null && b.createdOn == null) {
            return 0;
          }
          // tslint:disable-next-line: triple-equals
          if (a.createdOn == null) {
            return 1;
          }
          // tslint:disable-next-line: triple-equals
          if (b.createdOn == null) {
            return -1;
          }
          return b.createdOn.toMillis() - a.createdOn.toMillis();
        }
      )
      ;
  }
}
