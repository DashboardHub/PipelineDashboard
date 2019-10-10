// Firestore module
import { firestore } from 'firebase';

// Application model
import { UserModel } from './user.model';

/**
 * PullRequest model
 */
export class PullRequestModel {
  uid: string = '';
  url: string = '';
  state: string;
  title: string = '';
  owner: UserModel;
  id: number;
  assigned: UserModel;
  requestedReviewers: UserModel;
  description: string = '';
  statusesUrl: string = '';
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;
}
