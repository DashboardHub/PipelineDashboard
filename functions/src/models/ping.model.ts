import { firestore } from "firebase-admin";

/**
 * Pings model for functions
 */
export interface PingModel {
  monitorUid: string;
  codeMatched: boolean;
  duration: number;
  expectedCode: number;
  expectedText: string;
  url: string;
  isValid?: boolean;
  statusCode: number;
  textMatched: boolean;
  createdOn: firestore.Timestamp;
}
