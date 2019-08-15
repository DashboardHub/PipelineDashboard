import { isExistProperties, Repository, User } from './shared';

type Action = 'created' | 'deleted' | 'archived' | 'unarchived' | 'edited' | 'renamed' | 'transferred' | 'publicized' | 'privatized';

export interface RepositoryEventInput {
  action: Action;
  changes?: {
    repository: {
      name: { from: string }
    }
  };
  repository: Repository;
  sender: User;
}

export class RepositoryEventModel implements RepositoryEventInput {
  action: Action;
  changes?: {
    repository: {
      name: { from: string }
    }
  };
  repository: Repository;
  sender: User;

  constructor(input: RepositoryEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'repository', 'sender'];
    const objKeys: string[] = Object.keys(input);
    let length: number = requireKeys.length;

    if (objKeys.find((elem: string) => elem === 'changes')) {
      ++length;
    }

    return objKeys.length === length && isExistProperties(input, requireKeys);
  }

}
