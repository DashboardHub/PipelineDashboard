// Application model
import { UserModel } from './user.model';

/**
 * Milestone model
 */
export class MilestoneModel {
  title: string;
  creator: UserModel;
  state: string;
  openIssues: number;
  closeIssues: number;
  htmlUrl: string;
  description: string;
  updatedAt: string;
}
