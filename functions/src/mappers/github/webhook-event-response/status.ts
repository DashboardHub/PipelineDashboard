import { isExistProperties, Repository, User } from './shared';

interface Author {
  name: string;
  email: string;
  date: string;
}

interface Verification {
  verified: boolean;
  reason: string;
  signature: string;
  payload: string;
}

interface Commit2 {
  author: Author;
  committer: Author;
  message: string;
  tree: {
    sha: string;
    url: string;
  };
  url: string;
  comment_count: number;
  verification: Verification;
}

interface Commit {
  sha: string;
  node_id: string;
  commit: Commit2;
  url: string;
  html_url: string;
  comments_url: string;
  author: User;
  committer: User;
  parents: any[];
}


interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export interface StatusEventInput {
  id: number;
  sha: string;
  name: string;
  target_url: string;
  context: string;
  description: string;
  state: 'pending' | 'success' | 'failure' | 'error';
  commit: Commit;
  branches: Branch[];
  created_at: string;
  updated_at: string;
  repository: Repository;
  sender: User;
}

export class StatusEventModel implements StatusEventInput {
  id: number;
  sha: string;
  name: string;
  target_url: string;
  context: string;
  description: string;
  state: 'error' | 'pending' | 'success' | 'failure';
  commit: Commit;
  branches: Branch[];
  created_at: string;
  updated_at: string;
  repository: Repository;
  sender: User;

  constructor(input: StatusEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['id', 'sha', 'name', 'target_url', 'context', 'description',
      'state', 'commit', 'branches', 'created_at', 'updated_at', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }

}
