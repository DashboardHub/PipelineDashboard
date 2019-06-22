// Third party modules
import { firestore } from 'firebase';

// Dashboard hub models
import { AccessModel } from './access.model';
import { IProjectTokenModel } from './project-token.model';

export class ProjectModel {
  uid?: string = '';
  type?: 'private' | 'public' = 'public';
  title?: string = '';
  description?: string = '';
  access?: AccessModel = new AccessModel();
  repositories?: string[] = [];
  tokens?: IProjectTokenModel[] = [];
  createdOn?: firestore.Timestamp;
  updatedOn: firestore.Timestamp;

  constructor(uid: string = '') {
    this.uid = uid;
  }
}
