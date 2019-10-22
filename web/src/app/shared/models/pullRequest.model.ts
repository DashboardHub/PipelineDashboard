// Firestore module
import { firestore } from 'firebase';

// Application model
import { BuildTimes } from './build-times.model';
import { state } from './status.model';
import { UserModel } from './user.model';

/**
 * PullRequest model
 */
export class PullRequestModel {
  uid: string = '';
  url: string = '';
  state: state;
  title: string = '';
  owner: UserModel;
  id: number;
  assigned: UserModel;
  requestedReviewers: UserModel;
  description: string = '';
  statusesUrl: string = '';
  buildTimes?: BuildTimes[];
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;
}
