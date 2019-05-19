export interface GitHubOrganisationtInput {
  login: string;
  avatar_url: string;
}

export interface GitHubOrganisationModel {
  username: string;
  avatarUrl: string;
}
export class GitHubOrganisationMapper {
  static import(input: GitHubOrganisationtInput): GitHubOrganisationModel {
    return {
      username: input.login,
      avatarUrl: input.avatar_url,
    };
  }
}
