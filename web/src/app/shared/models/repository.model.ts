import { ContributorModel } from './contributor.model';
import { IssueModel } from './issue.model';
import { MilestoneModel } from './milestone.model';
import { PullRequestModel } from './pullRequest.model';
import { ReleaseModel } from './release.model';
import { WebhookModel } from './webhook.model';

/**
 * Repository model
 */
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
  license?: {
    name: string;
  };
  pullRequests?: PullRequestModel[];
  events?: Event[];
  releases?: ReleaseModel[];
  issues?: IssueModel[];
  lastUpdated: Date;
  contributors: ContributorModel[];
  milestones: MilestoneModel[];
  webhook: WebhookModel;

  constructor(fullName: string) {
    this.fullName = fullName;
    this.uid = fullName.replace('/', '+');
  }
}
