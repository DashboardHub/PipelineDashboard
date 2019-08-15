import { isExistProperties, Milestone, Repository, User } from './shared';

type Action = 'created' | 'closed' | 'opened' | 'edited' | 'deleted';

export interface MilestoneEventInput {
  action: Action;
  milestone: Milestone;
  repository: Repository;
  sender: User;
}

export class MilestoneEventModel implements MilestoneEventInput {
  action: Action;
  milestone: Milestone;
  repository: Repository;
  sender: User;

  constructor(input: MilestoneEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'milestone', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }

}
