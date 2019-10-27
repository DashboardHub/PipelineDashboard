// Firestore module

export type state = 'open' | 'closed' | 'failure' | 'success' | 'pending';

/**
 * Pull Request status model
 */
export class PullRequestStatusModel {
  id: number;
  state: state;
  context: string;
  createdAt: string;
  updatedAt: string;
}
