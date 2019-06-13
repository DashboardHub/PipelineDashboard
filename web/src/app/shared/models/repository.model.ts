import { IssueModel } from './issue.model';
import { PullRequestModel } from './pullRequest.model';
import { ReleaseModel } from './release.model';

export class RepositoryModel {
  uid?: string;
  id?: string;
  name?: string;
  description?: string;
  fullName: string;
  owner?: string;
  ownerId?: string;
  private?: boolean;
  fork?: string;
  archived?: string;
  forks?: number;
  stargazers?: string;
  watchers?: number;
  branch?: string;
  issues?: number;
  license?: string;
  pullRequests?: PullRequestModel[];
  events?: Event[];
  releases?: ReleaseModel[];
  issuesList?: IssueModel[];
  lastUpdated: Date;

  constructor(fullName: string) {
    this.fullName = fullName;
    this.uid = fullName.replace('/', '+');
  }
}
