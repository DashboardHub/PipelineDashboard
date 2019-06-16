import { ContributorModel } from './contributor.model';
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
  license?: string;
  pullRequests?: PullRequestModel[];
  events?: Event[];
  releases?: ReleaseModel[];
  issues?: IssueModel[];
  lastUpdated: Date;
  contributors: ContributorModel[];

  constructor(fullName: string) {
    this.fullName = fullName;
    this.uid = fullName.replace('/', '+');
  }
}
