import { isExistProperties, Repository, User } from './shared';

interface Release {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name?: any;
  draft: boolean;
  author: User;
  prerelease: boolean;
  created_at: Date;
  published_at: Date;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body?: any;
}

type Action = 'published' | 'unpublished' | 'created' | 'edited' | 'deleted' | 'prereleased';

export interface ReleaseEventInput {
  action: Action;
  release: Release;
  repository: Repository;
  sender: User;
}

export class ReleaseEventModel implements ReleaseEventInput {
  action: Action;
  release: Release;
  repository: Repository;
  sender: User;

  constructor(input: ReleaseEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'release', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }
}
