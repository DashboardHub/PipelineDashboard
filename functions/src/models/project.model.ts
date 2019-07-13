import { MonitorModel } from './monitor.model';

export class ProjectModel {
  uid?: string = '';
  url?: string = '';
  monitors?: MonitorModel[] = [];

  constructor(uid: string = '') {
    this.uid = uid;
  }
}
