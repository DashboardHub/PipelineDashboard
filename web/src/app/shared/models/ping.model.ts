export type PingType = 'scheduler' | 'manual'| 'automatic';

/**
 * Pings model for web
 */

export interface IPing {
  uid: string;
  codeMatched: boolean;
  duration: number;
  expectedCode: number;
  expectedText: string;
  url: string;
  isValid?: boolean;
  statusCode: number;
  textMatched: boolean;
  type: PingType;
  createdOn: Date;
}

export class PingModel {
  uid: string;
  codeMatched: boolean;
  duration: number;
  expectedCode: number;
  expectedText: string;
  url: string;
  isValid?: boolean;
  statusCode: number;
  textMatched: boolean;
  type: PingType;
  createdOn: Date;
}
