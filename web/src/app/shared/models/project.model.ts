// Third party modules
import { firestore } from 'firebase';

// Dashboard hub models
import { AccessModel } from './access.model';
import { MonitorModel } from './monitor.model';
import { PingModel } from './ping.model';
import { ProjectTokenModel } from './project-token.model';

/**
 * Interface for project
 */
export class IProject {
  uid?: string;
  type?: 'private' | 'public' = 'public';
  title?: string;
  description?: string;
  url?: string;
  logoUrl?: string;
  access?: AccessModel;
  repositories?: string[];
  monitors?: MonitorModel[];
  pings?: PingModel[];
  tokens?: ProjectTokenModel[];
  createdOn?: firestore.Timestamp;
  updatedOn?: firestore.Timestamp;
  views?: number;
}

/**
 * Project class model
 */
export class ProjectModel {
  uid: string;
  type: 'private' | 'public';
  title: string;
  description: string;
  url?: string = '';
  logoUrl?: string = '';
  access?: AccessModel;
  repositories: string[];
  monitors: MonitorModel[];
  pings: PingModel[] = [];
  tokens: ProjectTokenModel[] = [];
  createdOn?: firestore.Timestamp;
  updatedOn?: firestore.Timestamp;
  views?: number;

  /**
   * Life cycle method
   * @param project project
   */
  constructor(project: IProject) {
    this.uid = project.uid;
    this.type = project.type ? project.type : 'public';
    this.title = project.title ? project.title : undefined;
    this.description = project.description ? project.description : undefined;
    this.url = project.url ? project.url : undefined;
    this.logoUrl = project.logoUrl ? project.logoUrl : undefined;
    this.access = project.access ? project.access : new AccessModel();
    this.repositories = project.repositories ? project.repositories : [];
    this.monitors = project.monitors ? project.monitors : [];
    this.pings = project.pings ? project.pings : [];
    this.tokens = project.tokens ? project.tokens : [];
    this.createdOn = project.createdOn ? project.createdOn : undefined;
    this.updatedOn = project.updatedOn ? project.updatedOn : undefined;
    this.views = project.views ? project.views : undefined;
  }

  /**
   * Function to return the total ping count for each project
   */
  public getTotalPings(): number {
    let total: number = 0;
    this.monitors.forEach((monitor: MonitorModel) => {
      total += monitor.successfulPings || 0;
      total += monitor.unsuccessfulPings || 0;
    });

    return total;
  }
}
