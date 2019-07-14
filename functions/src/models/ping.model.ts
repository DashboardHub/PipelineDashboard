/**
 * Pings model for functions
 */
export interface PingModel {
  codeMatched: boolean;
  duration: number;
  expectedCode: number;
  expectedText: string;
  fullUrl: string;
  isValid?: boolean;
  statusCode: number;
  textMatched: boolean;
}
