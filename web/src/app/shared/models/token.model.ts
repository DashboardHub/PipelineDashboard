// Third party modules
import { firestore } from 'firebase';

export class TokenModel {
  uid?: string = '';
  name?: string = '';
  projectuid?: string = '';
  updatedOn: firestore.Timestamp;
  

}
