// Firestore module
import { firestore } from 'firebase';

/**
 * Pull Request status model
 */
export class PullRequestStatusModel {
  id: number;
  state: 'open' | 'closed' | 'failure' | 'success' | 'pending';
  context: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}
