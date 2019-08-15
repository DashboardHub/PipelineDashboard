import { firestore } from 'firebase-admin';
import { GitHubEventModel, GitHubEventType } from '../event.mapper';
import { GitHubPayloadInput, GitHubPayloadMapper } from '../payload.mapper';
import { GitHubRepositoryMapper } from '../repository.mapper';
import { GitHubUserMapper } from '../user.mapper';
import { isExistProperties, HubEventActions, Repository, User } from './shared';

interface Release {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name?: string;
  draft: boolean;
  author: User;
  prerelease: boolean;
  created_at: string;
  published_at: string;
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

export class ReleaseEventModel implements ReleaseEventInput, HubEventActions {
  action: Action;
  changes?: {
    body: { from: string },
    name: { from: string },
  };
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

  convertToHubEvent(): GitHubEventModel {
    const eventType: GitHubEventType = 'ReleaseEvent';
    const payload: GitHubPayloadInput = {
      action: this.action,
      release: this.release,
    }

    const data: GitHubEventModel = {
      type: eventType,
      public: true, // TODO where get
      actor: GitHubUserMapper.import(this.sender),
      repository: GitHubRepositoryMapper.import(this.repository, 'event'),
      payload: GitHubPayloadMapper.import(eventType, payload),
      createdOn: this.release.created_at,
    };

    return data;
  }

}
