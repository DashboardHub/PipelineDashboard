// Third party modules
import { firestore } from 'firebase';

export class ProjectTokenModel {
  uid: string;
  name: string;
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;

  constructor(obj?: any) {
    this.uid = obj ? obj.uid : undefined;
    this.name = obj ? obj.name : undefined;
    this.createdOn = obj ? obj.createdOn : undefined;
    this.updatedOn = obj ? obj.updatedOn : undefined;
  }
}
