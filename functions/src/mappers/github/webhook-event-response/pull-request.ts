import { isExistProperties, Repository, User } from './shared';


interface InfoRepoObj {
  label: string;
  ref: string;
  sha: string;
  user: User;
  repo: Repository;
}

interface LinkObj {
  href: string;
}

interface Links {
  self: LinkObj;
  html: LinkObj;
  issue: LinkObj;
  comments: LinkObj;
  review_comments: LinkObj;
  review_comment: LinkObj;
  commits: LinkObj;
  statuses: LinkObj;
}

interface PullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: User;
  body: string;
  created_at: Date;
  updated_at: Date;
  closed_at?: any;
  merged_at?: any;
  merge_commit_sha?: any;
  assignee?: any;
  assignees: any[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: any[];
  milestone?: any;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: InfoRepoObj;
  base: InfoRepoObj;
  _links: Links;
  author_association: string;
  draft: boolean;
  merged: boolean;
  mergeable?: any;
  rebaseable?: any;
  mergeable_state: string;
  merged_by?: any;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

type Action = 'assigned' | 'unassigned' | 'review_requested' | 'review_request_removed' | 'labeled' | 'unlabeled' | 'opened' | 'edited' | 'closed' | 'ready_for_review' | 'locked' | 'unlocked' | 'reopened';

export interface PullRequestEventInput {
  action: Action;
  number: number;
  pull_request: PullRequest;
  repository: Repository;
  sender: User;
}

export class PullRequestEventModel implements PullRequestEventInput {
  action: Action;
  number: number;
  pull_request: PullRequest;
  repository: Repository;
  sender: User;

  constructor(input: PullRequestEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'number', 'pull_request', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }
}
