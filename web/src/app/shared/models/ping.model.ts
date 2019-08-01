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
  createdOn: Date;
  type: string;
}
