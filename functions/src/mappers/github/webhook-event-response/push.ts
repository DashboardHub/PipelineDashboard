import { isExistProperties, Repository, User } from "./shared";

interface Pusher {
  name: string;
  email: string;
}

export interface PushEventInput {
  ref: string;
  before: string;
  after: string;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  base_ref?: any;
  compare: string;
  commits: any[];
  head_commit?: any;
  repository: Repository;
  pusher: Pusher;
  sender: User;
}


export class PushEventModel implements PushEventInput {
  ref: string;
  before: string;
  after: string;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  base_ref?: any;
  compare: string;
  commits: any[];
  head_commit?: any;
  repository: Repository;
  pusher: Pusher;
  sender: User;

  constructor(input: PushEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['ref', 'before', 'after', 'created', 'deleted', 'forced', 'base_ref', 'compare', 'commits', 'head_commit', 'repository', 'pusher', 'sender'];
    return isExistProperties(input, requireKeys);
  }
}
