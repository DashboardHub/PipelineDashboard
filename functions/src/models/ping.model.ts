export interface PingModel {
  statusCode: number;
  expectedCode: number;
  expectedText: string;
  codeMatched: boolean;
  textMatched: boolean;
  duration: number;
  isValid?: boolean;
}
