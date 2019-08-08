import { isExistProperties, Repository, User } from './shared';

type Action = 'created' | 'deleted' | 'archived' | 'unarchived' | 'edited' | 'renamed' | 'transferred' | 'publicized' | 'privatized';

export interface RepositoryEventInput {
  action: Action;
  repository: Repository;
  sender: User;
}

export class RepositoryEventModel implements RepositoryEventInput {
  action: Action;
  repository: Repository;
  sender: User;

  constructor(input: RepositoryEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'repository', 'sender'];
    return Object.keys(input).length === requireKeys.length && isExistProperties(input, requireKeys);
  }
}
