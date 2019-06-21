import { firestore } from 'firebase';

export class LoginAuditModel {
  date: firestore.Timestamp;
  userAgent: string;
  device: string;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
}
