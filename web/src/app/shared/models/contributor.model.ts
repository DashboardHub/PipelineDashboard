// Application model
import { UserModel } from './user.model';

/**
 * Contribution model
 */
export class ContributorModel {
  owner: UserModel;
  total: number;
}
