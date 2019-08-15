import { GitHubEventModel, GitHubEventType } from '../event.mapper';
import { GitHubPayloadInput, GitHubPayloadMapper } from '../payload.mapper';
import { GitHubRepositoryMapper } from '../repository.mapper';
import { GitHubUserMapper } from '../user.mapper';
import { isExistProperties, HubEventActions, Repository, User } from './shared';

export interface CreateEventInput {
  ref: string;
  ref_type: 'branch' | 'tag';
  master_branch: string;
  description?: any;
  pusher_type: string;
  repository: Repository;
  sender: User;
}

export class CreateEventModel implements CreateEventInput, HubEventActions {
  ref: string;
  ref_type: 'branch' | 'tag';
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

  convertToHubEvent(): GitHubEventModel {
    const eventType: GitHubEventType = 'CreateEvent';
    const payload: GitHubPayloadInput = {
      // title: `Created ${this.ref_type} '${this.ref}'.` + this.description ? ` ${this.description}` : '',
      ref: this.ref,
      ref_type: this.ref_type,
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

}
