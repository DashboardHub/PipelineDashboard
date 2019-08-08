import { isExistProperties, Issue, Repository, User } from './shared';

type Action = 'opened' | 'edited' | 'deleted' | 'transferred' | 'pinned' | 'unpinned' | 'closed' | 'reopened' | 'assigned' | 'unassigned' | 'labeled' | 'unlabeled' | 'locked' | 'unlocked' | 'milestoned' | 'demilestoned';

export interface IssuesEventInput {
  action: Action;
  issue: Issue;
  changes?: any;
  repository: Repository;
  sender: User;
}

export class IssuesEventModel implements IssuesEventInput {
  action: Action;
  issue: Issue;
  changes?: any;
  repository: Repository;
  sender: User;

  constructor(input: IssuesEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'issue', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }
}
