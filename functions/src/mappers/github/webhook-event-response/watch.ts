import { firestore } from 'firebase-admin';

// Dashboard mappers/models
import { GitHubEventModel, GitHubEventType } from '../event.mapper';
import { GitHubPayloadInput, GitHubPayloadMapper } from '../payload.mapper';
import { GitHubRepositoryMapper } from '../repository.mapper';
import { GitHubUserMapper } from '../user.mapper';
import { isExistProperties, HubEventActions, Repository, User } from './shared';

export interface WatchEventInput {
  action: 'started';
  repository: Repository;
  sender: User;
}

export class WatchEventModel implements WatchEventInput, HubEventActions {
  action: 'started';
  repository: Repository;
  sender: User;

  constructor(input: WatchEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'repository', 'sender'];
    return Object.keys(input).length === requireKeys.length && isExistProperties(input, requireKeys) && input.action === 'started';
  }

  convertToHubEvent(): GitHubEventModel {
    const eventType: GitHubEventType = 'WatchEvent';
    const payload: GitHubPayloadInput = {
      action: this.action,
    }

    const data: GitHubEventModel = {
      type: eventType,
      public: true, // TODO where get
      actor: GitHubUserMapper.import(this.sender),
      repository: GitHubRepositoryMapper.import(this.repository, 'event'),
      payload: GitHubPayloadMapper.import(eventType, payload),
      createdOn: firestore.Timestamp.now(),
    };

    return data;
  }

}
