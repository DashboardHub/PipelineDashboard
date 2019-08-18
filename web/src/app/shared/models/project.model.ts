// Third party modules
import { firestore } from 'firebase';

// Dashboard hub models
import { AccessModel, IAccess } from './access.model';
import { IModel, Model } from './model.model';
import { IMonitor, MonitorModel } from './monitor.model';
import { PingModel } from './ping.model';
import { ProjectTokenModel } from './project-token.model';

/**
 * Interface for project
 */
export interface IProject extends IModel {
  uid?: string;
  type?: 'private' | 'public';
  title?: string;
  description?: string;
  url?: string;
  logoUrl?: string;
  access?: IAccess;
  repositories?: string[];
  monitors?: IMonitor[];
  pings?: PingModel[];
  tokens?: ProjectTokenModel[];
  views?: firebase.firestore.FieldValue | number;
  createdOn?: firestore.Timestamp;
  updatedOn?: firestore.Timestamp;
}

/**
 * Project class model
 */
export class ProjectModel extends Model<IProject> implements IProject {
  private _url?: string;
  private _access?: AccessModel;

  uid: string;
  type: 'private' | 'public';
  title: string;
  description: string;
  logoUrl?: string;
  repositories: string[];
  monitors: MonitorModel[];
  pings: PingModel[];
  tokens: ProjectTokenModel[];
  views?: firebase.firestore.FieldValue | number;
  createdOn?: firestore.Timestamp;
  updatedOn?: firestore.Timestamp;

  /**
   * Life cycle method
   * @param project project
   */
  constructor(project: IProject) {
    super();
    this.uid = project.uid;
    this.type = project.type ? project.type : 'public';
    this.title = project.title ? project.title : undefined;
    this.description = project.description ? project.description : '';
    this.url = project.url ? project.url : '';
    this.logoUrl = project.logoUrl ? project.logoUrl : '';
    this.access = project.access ? new AccessModel(project.access) : new AccessModel();
    this.repositories = project.repositories ? project.repositories : [];
    this.monitors = project.monitors ? project.monitors.map((monitor: IMonitor) => new MonitorModel(monitor)) : [];
    this.pings = project.pings ? project.pings : [];
    this.tokens = project.tokens ? project.tokens : [];
    this.views = project.views ? project.views : 0;
    this.createdOn = project.createdOn ? project.createdOn : undefined;
    this.updatedOn = project.updatedOn ? project.updatedOn : undefined;
  }

  /**
   * Function to return the total ping count for each project
   */
  public getTotalPings(): number {
    let total: number = 0;
    this.monitors.forEach((monitor: MonitorModel) => monitor.getTotalPings());

    return total;
  }

  /**
   * This function stripes the trailing slash from url
   * @return the url after stripe of the trailing slash
   */
  public get access(): AccessModel {
    return this._access;
  }

  /**
   * This function stripes the trailing slash from url
   * @param url the url address
   */
  public set access(access: AccessModel) {
    this._access = new AccessModel(access);
  }

  /**
   * This function stripes the trailing slash from url
   * @return the url after stripe of the trailing slash
   */
  public get url(): string {
    return this._url;
  }

  /**
   * This function stripes the trailing slash from url
   * @param url the url address
   */
  public set url(url: string) {
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }

    this._url = url;
  }

  /**
   * Check if has project access
   * @param userUid user uid
   */
  public hasAccess(userUid: string): boolean {
    return this.access.readonly.includes(userUid);
  }

  /**
   * Check if owner of the project
   * @param userUid user uid
   */
  public isAdmin(userUid: string): boolean {
    return this.access.admin.includes(userUid);
  }

  /**
   * The models to data only
   */
  public toData(): IProject {
    return {
      uid: this.uid,
      type: this.type,
      title: this.title,
      description: this.description,
      url: this.url,
      logoUrl: this.logoUrl,
      access: this.access.toData(),
      repositories: this.repositories,
      monitors: this.monitors.map((monitor: MonitorModel) => monitor.toData()),
      pings: this.pings,
      tokens: this.tokens,
      views: this.views,
      createdOn: this.createdOn,
      updatedOn: this.updatedOn,
    };
  }
}
