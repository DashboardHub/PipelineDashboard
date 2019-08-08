import { isExistProperties, Issue, Repository, User } from './shared';

interface Comment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: User;
  created_at: Date;
  updated_at: Date;
  author_association: string;
  body: string;
}

type Action = 'created' | 'edited' | 'deleted';

export interface IssueCommentEventInput {
  action: Action;
  issue: Issue;
  comment: Comment;
  repository: Repository;
  sender: User;
}

export class IssueCommentEventModel implements IssueCommentEventInput {
  action: Action;
  issue: Issue;
  comment: Comment;
  repository: Repository;
  sender: User;

  constructor(input: IssueCommentEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'issue', 'comment', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }
}
