/**
 * Pings model for web
 */
export class PingModel {
  codeMatched: boolean;
  duration: number;
  expectedCode: number;
  expectedText: string;
  url: string;
  isValid?: boolean;
  statusCode: number;
  textMatched: boolean;
  type: 'scheduler' | 'manual';
  createdOn: Date;
}
