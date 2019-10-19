// Firestore module
import { firestore } from 'firebase';

export type state = 'open' | 'closed' | 'failure' | 'success' | 'pending';

/**
 * Pull Request status model
 */
export class PullRequestStatusModel {
  id: number;
  state: state;
  context: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}
