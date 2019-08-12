import { PingModel } from './ping.model';

export type MonitorMethod = 'GET' | 'POST';

export interface IMonitor {
  uid: string;
  name: string;
  method: MonitorMethod;
  path: string;
  expectedCode: number;
  expectedText?: string;
  latestPing: PingModel;
  successfulPings: number;
  unsuccessfulPings: number;
}

export class MonitorModel implements IMonitor {
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
    this.uid = monitor.uid;
    this.name = monitor.name;
    this.method = monitor.method;
    this.path = monitor.path;
    this.expectedCode = monitor.expectedCode;
    this.expectedText = monitor.expectedText ? monitor.expectedText : undefined;
    this.latestPing = monitor.latestPing ? monitor.latestPing : undefined;
    this.successfulPings = monitor.successfulPings ? monitor.successfulPings : 0;
    this.unsuccessfulPings = monitor.unsuccessfulPings ? monitor.unsuccessfulPings : 0;
  }

  public getTotalPings(): number {
    return this.successfulPings + this.unsuccessfulPings;
  }
}
