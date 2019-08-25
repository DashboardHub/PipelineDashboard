import { firestore } from "firebase-admin";

export type PingType = 'scheduler' | 'manual'| 'automatic';
/**
 * Pings model for functions
 */
export interface PingModel {
  uid: string;
  monitorUid: string;
  codeMatched: boolean;
  duration: number;
  expectedCode: number;
  expectedText: string;
  url: string;
  isValid?: boolean;
  statusCode: number;
  textMatched: boolean;
  type: PingType;
  createdOn: firestore.Timestamp;
}
