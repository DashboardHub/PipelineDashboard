import { GitHubUserInput, GitHubUserMapper, GitHubUserModel } from './index.mapper';

export interface GitHubMilestoneInput {
  id: number;
  title: string;
  creator: GitHubUserInput;
  state: string;
  open_issues: number;
  closed_issues: number;
  html_url: string;
  description: string;
  updated_at: string;
}

export interface GitHubMilestoneModel {
  uid: number;
  title: string;
  creator: GitHubUserModel;
  state: string;
  openIssues: number;
  closeIssues: number;
  htmlUrl: string;
  description: string;
  updatedAt: string;
}

export class GitHubMilestoneMapper {
  static import(input: GitHubMilestoneInput): GitHubMilestoneModel {
    return {
      uid: input.id,
      title: input.title,
      creator: GitHubUserMapper.import(input.creator),
      state: input.state,
      openIssues: input.open_issues,
      closeIssues: input.closed_issues,
      htmlUrl: input.html_url,
      description: input.description,
      updatedAt: input.updated_at,
    };
  }
}
