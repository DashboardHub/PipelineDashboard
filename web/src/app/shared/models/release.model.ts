// Firestore module
import { firestore } from 'firebase';

// User model
import { UserModel } from './user.model';

/**
 * Release model
 */
export class ReleaseModel {
  uid: string;
  title: string;
  description: string;
  owner: UserModel;
  htmlUrl: string;
  createdOn: firestore.Timestamp;
}
