import { firestore } from 'firebase';
import { UserModel } from './user.model';

export class ReleaseModel {
  uid: string;
  title: string;
  description: string;
  owner: UserModel;
  htmlUrl: string;
  createdOn: firestore.Timestamp;
}
