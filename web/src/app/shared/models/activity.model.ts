// Application model
import { RepositoryModel } from './repository.model';

/**
 * Activity model
 */
export class ActivityModel {
  type: string;
  payload: { title: string, action?: string };
  repository: RepositoryModel;
  createdOn: Date;
}
