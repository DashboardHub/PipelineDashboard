// Third party modules
import { firestore } from 'firebase';

// Dashboard hub models
import { AccessModel } from './access.model';
import { ProjectTokenModel } from './project-token.model';

export class ProjectModel {
  uid?: string = '';
  type?: 'private' | 'public' = 'public';
  title?: string = '';
  description?: string = '';
  access?: AccessModel = new AccessModel();
  repositories?: string[] = [];
  tokens?: ProjectTokenModel[] = [];
  createdOn?: firestore.Timestamp;
  updatedOn: firestore.Timestamp;

  constructor(uid: string = '') {
    this.uid = uid;
  }
}
