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
  createdOn: Date;
  updatedOn: Date;
}
