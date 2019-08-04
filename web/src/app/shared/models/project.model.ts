// Third party modules
import { firestore } from 'firebase';

// Dashboard hub models
import { AccessModel } from './access.model';
import { MonitorModel } from './monitor.model';
import { PingModel } from './ping.model';
import { ProjectTokenModel } from './project-token.model';

export class ProjectModel {
  uid?: string = '';
  type?: 'private' | 'public' = 'public';
  title?: string = '';
  description?: string = '';
  url?: string = '';
  access?: AccessModel = new AccessModel();
  repositories?: string[] = [];
  monitors?: MonitorModel[] = [];
  pings?: PingModel[] = [];
  tokens?: ProjectTokenModel[] = [];
  createdOn?: firestore.Timestamp;
  updatedOn: firestore.Timestamp;
  pingCount?: number;

  constructor(uid: string = '') {
    this.uid = uid;
  }
}
