import { PingModel } from './ping.model';

/**
 * Monitor model for functions
 */
export class MonitorModel {
  expectedCode: number;
  expectedText?: string;
  method: 'GET';
  name: string;
  path: string;
  uid: string;
  latestPing: PingModel;
  successPingCounts: number;
  unsuccessPingCounts: number;
}
