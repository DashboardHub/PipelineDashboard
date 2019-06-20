import { UserModel } from './user.model';

export class PullRequestModel {
  uid: string = '';
  url: string = '';
  state: 'open' | 'closed';
  title: string = '';
  owner: UserModel;
  number: number;
  assigned: UserModel;
  requestedReviewers: UserModel;
  description: string = '';
  createdOn: Date;
  updatedOn: Date;
}
