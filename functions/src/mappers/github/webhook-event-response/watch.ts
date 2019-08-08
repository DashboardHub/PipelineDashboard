import { isExistProperties, Repository, User } from './shared';

export interface WatchEventInput {
  action: 'started';
  repository: Repository;
  sender: User;
}

export class WatchEventModel implements WatchEventInput {
  action: 'started';
  repository: Repository;
  sender: User;

  constructor(input: WatchEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'repository', 'sender'];
    return Object.keys(input).length === requireKeys.length && isExistProperties(input, requireKeys) && input.action === 'started';
  }
}
