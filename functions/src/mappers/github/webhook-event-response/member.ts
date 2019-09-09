import { isExistProperties, Repository, User } from './shared';

interface Member {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface MemberEventInput {
  action: 'added' | 'deleted' | 'edited';
  member: Member;
  repository: Repository;
  sender: User;
  changes?: { old_permission: { from: string } };
}

export class MemberEventModel implements MemberEventInput {
  action: 'added' | 'deleted' | 'edited';
  member: Member;
  repository: Repository;
  sender: User;
  changes?: { old_permission: { from: string } };

  constructor(input: MemberEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'member', 'repository', 'sender'];

    const objKeys: string[] = Object.keys(input);
    let length: number = requireKeys.length;

    if (objKeys.find((elem: string) => elem === 'changes')) {
      ++length;
    }

    return objKeys.length === length && isExistProperties(input, requireKeys);
  }

}
