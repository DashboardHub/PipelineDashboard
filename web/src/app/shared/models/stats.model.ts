// Application models
import { IModel, Model } from './model.model';

/**
 * Stats interface
 */
export interface IStats extends IModel {
  projects?: number;
  users?: number;
  pings?: number;
  events?: number;
}

/**
 * Stats model
 */
export class StatsModel extends Model<IStats> implements IStats {
  projects?: number;
  users?: number;
  pings?: number;
  events?: number;

  /**
   * Life cycle method
   * @param data data to be initialized
   */
  constructor(data?: IStats) {
    super();
    this.projects = data.projects ? data.projects : 0;
    this.users = data.users ? data.users : 0;
    this.pings = data.pings ? data.pings : 0;
    this.events = data.events ? data.events : 0;
  }

  /**
   * Method to convert model to data
   */
  toData(): IStats {
    return  {
      projects: this.projects,
      users: this.users,
      pings: this.pings,
      events: this.events,
    };
  }
}
