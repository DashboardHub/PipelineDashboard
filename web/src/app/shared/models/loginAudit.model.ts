// Firestore module
import { firestore } from 'firebase';

/**
 * LoginAudit model
 */
export class LoginAuditModel {
  date: firestore.Timestamp;
  userAgent: string;
  device: string;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
}
