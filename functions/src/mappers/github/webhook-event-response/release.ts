import { DocumentData } from '../../../client/firebase-admin';
import { GitHubEventModel, GitHubEventType } from '../event.mapper';
import { GitHubPayloadInput, GitHubPayloadMapper } from '../payload.mapper';
import { GitHubReleaseMapper, GitHubReleaseModel } from '../release.mapper';
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
      createdOn: new Date().toISOString(),
    };

    return data;
  }

  updateData(repository: DocumentData): void {

    if (!Array.isArray(repository.releases)) {
      repository.releases = [];
    }

    switch (this.action) {
      case 'created': {
        this.created(repository);
      }
      case 'published': {
        this.published(repository);
        break;
      }

      case 'unpublished': {
        this.unpublished(repository);
        break;
      }

      case 'edited': {
        this.edited(repository);
        break;
      }

      case 'deleted': {
        this.deleted(repository);
        break;
      }

      case 'prereleased': {
        this.prereleased(repository);
        break;
      }

      default: {
        throw new Error('Not found action');
      }
    }

    GitHubReleaseMapper.sortReleaseList(repository.releases);
  }

  private getModel(): GitHubReleaseModel {
    return {
      uid: this.release.id,
      title: this.release.name,
      description: this.release.body,
      owner: GitHubUserMapper.import(this.release.author),
      htmlUrl: this.release.html_url,
      createdOn: this.release.published_at,
      isPrerelease: this.release.prerelease,
    }
  }

  private created(repository: DocumentData): void {

    const release: GitHubReleaseModel = this.getModel();

    repository.releases.unshift(release);
  }

  private published(repository: DocumentData): void {
    const foundIndex: number = repository.releases.findIndex((elem: GitHubReleaseModel) => elem.uid === this.release.id);
    if (foundIndex > -1) {
      repository.releases[foundIndex] = this.getModel();
    } else {
      this.created(repository);
    }
  }

  private unpublished(repository: DocumentData): void {
    this.published(repository);
  }

  private edited(repository: DocumentData): void {
    this.published(repository);
  }

  private prereleased(repository: DocumentData): void {
    this.published(repository);
  }

  private deleted(repository: DocumentData): void {
    if (!Array.isArray(repository.releases)) {
      return;
    }

    repository.releases = repository.releases.filter((item: GitHubReleaseModel) => item.uid !== this.release.id);
  }
}
