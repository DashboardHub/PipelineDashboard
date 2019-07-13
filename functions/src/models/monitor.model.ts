/**
 * Monitor model for functions
 */
export class MonitorModel {
  expectedCode: number;
  expectedText?: string;
  method: 'GET' | 'POST';
  name: string;
  path: string;
  uid: string;
}
