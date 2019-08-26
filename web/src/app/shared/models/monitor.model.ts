import { IModel, Model } from './model.model';
import { PingModel } from './ping.model';

export type MonitorMethod = 'GET' | 'POST';

export interface IMonitor extends IModel {
  uid: string;
  name: string;
  method: MonitorMethod;
  path: string;
  expectedCode: number;
  expectedText?: string;
  latestPing?: PingModel;
  successfulPings?: number;
  unsuccessfulPings?: number;
}

export class MonitorModel extends Model<IMonitor> implements IMonitor {
  uid: string;
  name: string;
  method: MonitorMethod;
  path: string;
  expectedCode: number;
  expectedText?: string;
  latestPing: PingModel;
  successfulPings: number;
  unsuccessfulPings: number;

  constructor(monitor: IMonitor) {
    super();
    this.uid = monitor.uid;
    this.name = monitor.name;
    this.method = monitor.method;
    this.path = monitor.path;
    this.expectedCode = monitor.expectedCode;
    this.expectedText = monitor.expectedText ? monitor.expectedText : '';
    this.latestPing = monitor.latestPing ? monitor.latestPing : undefined;
    this.successfulPings = monitor.successfulPings ? monitor.successfulPings : 0;
    this.unsuccessfulPings = monitor.unsuccessfulPings ? monitor.unsuccessfulPings : 0;
  }

  public getTotalPings(): number {
    return this.successfulPings + this.unsuccessfulPings;
  }

  public toData(requiredOnly?: boolean): IMonitor {
    let data: IMonitor = {
      uid: this.uid,
      name: this.name,
      method: this.method,
      path: this.path,
      expectedCode: this.expectedCode,
      expectedText: this.expectedText,
    };

    if (!requiredOnly) {
      data.successfulPings = this.successfulPings;
      data.unsuccessfulPings = this.unsuccessfulPings;
    }

    if (this.latestPing) {
      data.latestPing = this.latestPing;
    }

    return data;
  }
}
