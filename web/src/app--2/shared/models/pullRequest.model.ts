import { UserModel } from './user.model';

export class PullRequestModel {
  uid: string = '';
  url: string = '';
  state: 'open' | 'closed';
  title: string = '';
  owner: UserModel;
  assigned: UserModel;
  requestedReviewers: UserModel;
  description: string = '';
  createdOn: Date;
  updatedOn: Date;
}
