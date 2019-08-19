// Dashboard hub firebase functions mappers/models
import { GitHubUserInput, GitHubUserMapper, GitHubUserModel } from './user.mapper';

export interface GitHubIssueInput {
  id: number;
  html_url: string;
  state: string;
  title: string;
  number: number;
  body: string;
  user: GitHubUserInput;
  assignees: GitHubUserInput[];
  created_at: string;
  updated_at: string;
}

export interface GitHubIssueModel {
  uid: number;
  url: string;
  state: string;
  title: string;
  number: number;
  description: string;
  owner: GitHubUserModel;
  assignees: GitHubUserModel[];
  createdOn: string;
  updatedOn: string;
}

export class GitHubIssueMapper {
  static import(input: GitHubIssueInput): GitHubIssueModel {
    return {
      uid: input.id,
      url: input.html_url,
      state: input.state,
      title: input.title,
      number: input.number,
      description: input.body,
      owner: GitHubUserMapper.import(input.user),
      assignees: input.assignees.map((assignee: GitHubUserInput) => GitHubUserMapper.import(assignee)),
      createdOn: input.created_at,
      updatedOn: input.updated_at,
    };
  }
}
