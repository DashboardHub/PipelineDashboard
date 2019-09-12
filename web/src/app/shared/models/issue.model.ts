import { firestore } from 'firebase';
import { UserModel } from './user.model';

export class IssueModel {
  uid: string = '';
  url: string = '';
  state: '';
  title: string = '';
  number: number;
  owner: UserModel;
  assigned: UserModel;
  description: string = '';
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;
}
