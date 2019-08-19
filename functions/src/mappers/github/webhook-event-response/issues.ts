import { DocumentData } from '../../../client/firebase-admin';
import { GitHubEventModel, GitHubEventType } from '../event.mapper';
import { GitHubPayloadInput, GitHubPayloadMapper } from '../payload.mapper';
import { GitHubRepositoryMapper } from '../repository.mapper';
import { GitHubUserMapper } from '../user.mapper';
import { isExistProperties, HubEventActions, Issue, Repository, User } from './shared';

type Action = 'opened' | 'edited' | 'deleted' | 'transferred' | 'pinned' | 'unpinned' | 'closed' | 'reopened' | 'assigned' | 'unassigned' | 'labeled' | 'unlabeled' | 'locked' | 'unlocked' | 'milestoned' | 'demilestoned';

export interface IssuesEventInput {
  action: Action;
  issue: Issue;
  changes?: any;
  repository: Repository;
  sender: User;
}

export class IssuesEventModel implements IssuesEventInput, HubEventActions {
  action: Action;
  issue: Issue;
  changes?: any;
  repository: Repository;
  sender: User;

  constructor(input: IssuesEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'issue', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }

  convertToHubEvent(): GitHubEventModel {
    const eventType: GitHubEventType = 'IssuesEvent';
    const payload: GitHubPayloadInput = {
      action: this.action,
      issue: this.issue,
    };

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

    switch (this.action) {
      case 'opened': {
        break;
      }
      case 'edited': {
        break;
      }

      case 'deleted': {
        break;
      }

      case 'transferred': {
        break;
      }

      case 'pinned': {
        break;
      }

      case 'unpinned': {
        break;
      }

      case 'closed': {
        break;
      }

      case 'reopened': {
        break;
      }

      case 'assigned': {
        break;
      }

      case 'unassigned': {
        break;
      }

      case 'labeled': {
        break;
      }

      case 'unlabeled': {
        break;
      }

      case 'locked': {
        break;
      }

      case 'unlocked': {
        break;
      }

      case 'milestoned': {
        break;
      }

      case 'demilestoned': {
        break;
      }

    }
  }


}
