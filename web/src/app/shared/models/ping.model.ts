/**
 * Pings model for web
 */
export class PingModel {
  codeMatched: boolean;
  duration: number;
  expectedCode: number;
  expectedText: string;
  fullUrl: string;
  isValid?: boolean;
  statusCode: number;
  textMatched: boolean;
}
