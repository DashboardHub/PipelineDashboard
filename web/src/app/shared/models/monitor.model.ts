import { PingModel } from './ping.model';

export class MonitorModel {
  uid: string;
  name: string;
  method: 'GET' | 'POST';
  path: string;
  expectedCode: number;
  expectedText?: string;
  latestPing: PingModel;
  successPingCounts: number;
  unsuccessPingCounts: number;
}
