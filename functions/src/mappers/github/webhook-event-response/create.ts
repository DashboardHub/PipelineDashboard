import { isExistProperties, Repository, User } from './shared';

export interface CreateEventInput {
  ref: string;
  ref_type: string;
  master_branch: string;
  description?: any;
  pusher_type: string;
  repository: Repository;
  sender: User;
}

export class CreateEventModel implements CreateEventInput {
  ref: string;
  ref_type: string;
  master_branch: string;
  description?: any;
  pusher_type: string;
  repository: Repository;
  sender: User;

  constructor(input: CreateEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['ref', 'ref_type', 'master_branch', 'pusher_type', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }
}
