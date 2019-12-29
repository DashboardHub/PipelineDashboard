import { firestore } from 'firebase-admin';

// Dashboard mappers/models
import { DocumentData } from '../../../client/firebase-admin';
import { Logger } from '../../../client/logger';
import { GitHubEventModel, GitHubEventType } from '../event.mapper';
import { GitHubPullRequestModel } from '../index.mapper';
import { GitHubPayloadInput, GitHubPayloadMapper } from '../payload.mapper';
import { GitHubRepositoryMapper } from '../repository.mapper';
import { GitHubUserMapper } from '../user.mapper';
import { isExistProperties, HubEventActions, Issue, Repository, User } from './shared';

interface Comment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: User;
  created_at: string;
  updated_at: string;
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

export class IssueCommentEventModel implements IssueCommentEventInput, HubEventActions {
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

  convertToHubEvent(): GitHubEventModel {
    const eventType: GitHubEventType = 'IssueCommentEvent';
    const payload: GitHubPayloadInput = {
      action: this.action,
      comment: this.comment,
    };

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

  updateData(repository: DocumentData): void {
    if (!Array.isArray(repository.pullRequests)) {
      repository.pullRequests = [];
    }

    switch (this.action) {
      case 'created':
          {
            this.updated(repository, 1);
            break;
          }
      case 'deleted':
          {
            this.updated(repository, -1);
            break;
          }
      
      default: {
        Logger.info('ACTION: ', this.action);
        throw new Error('Not found action');
      }
    }

  }

  private updated(repository: DocumentData, number: number): void {
    const foundIndex: number = repository.pullRequests.findIndex((elem: GitHubPullRequestModel) => elem.id === this.issue.number);
    if (foundIndex > -1) {
      repository.pullRequests[foundIndex].comments += number;
    }
  }

}
