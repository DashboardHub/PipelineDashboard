import { PingModel } from './ping.model';

export type MonitorMethod = 'GET' | 'POST';

/**
 * Monitor model for functions
 */
export class MonitorModel {
  expectedCode: number;
  expectedText?: string;
  method: MonitorMethod;
  name: string;
  path: string;
  uid: string;
  latestPing: PingModel;
  successfulPings: number;
  unsuccessfulPings: number;
}
