import { firestore } from 'firebase';
import { UserModel } from './user.model';

export class PullRequestModel {
  uid: string = '';
  url: string = '';
  state: 'open' | 'closed';
  title: string = '';
  owner: UserModel;
  id: number;
  assigned: UserModel;
  requestedReviewers: UserModel;
  description: string = '';
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;
}
