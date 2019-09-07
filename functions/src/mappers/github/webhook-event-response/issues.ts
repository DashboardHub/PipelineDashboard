import { DocumentData } from '../../../client/firebase-admin';
import { GitHubEventModel, GitHubEventType } from '../event.mapper';
import { GitHubIssueModel } from '../issue.mapper';
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

    if (!Array.isArray(repository.issues)) {
      repository.issues = [];
    }

    switch (this.action) {
      case 'opened': {
        this.opened(repository);
        break;
      }

      case 'pinned':
      case 'unpinned':
      case 'reopened':
      case 'assigned':
      case 'unassigned':
      case 'labeled':
      case 'unlabeled':
      case 'locked':
      case 'unlocked':
      case 'milestoned':
      case 'demilestoned':
      case 'transferred':
      case 'edited': {
        this.edited(repository);
        break;
      }

      case 'closed':
      case 'deleted': {
        this.deleted(repository);
        break;
      }

      default: {
        throw new Error('Not found action');
      }
    }

  }

  private getModel(): GitHubIssueModel {
    return {
      uid: this.issue.id,
      url: this.issue.html_url,
      state: this.issue.state,
      title: this.issue.title,
      number: this.issue.number,
      description: this.issue.body,
      owner: GitHubUserMapper.import(this.issue.user),
      assignees: this.issue.assignees.map((assignee: User) => GitHubUserMapper.import(assignee)),
      createdOn: this.issue.created_at,
      updatedOn: this.issue.updated_at,
    }
  }

  private opened(repository: DocumentData): void {

    const issue: GitHubIssueModel = this.getModel();

    repository.issues.unshift(issue);
  }


  private edited(repository: DocumentData): void {
    const foundIndex: number = repository.issues.findIndex((elem: GitHubIssueModel) => elem.uid === this.issue.id);
    if (foundIndex > -1) {
      repository.issues[foundIndex] = this.getModel();
    } else {
      this.opened(repository);
    }
  }


  private deleted(repository: DocumentData): void {
    if (!Array.isArray(repository.issues)) {
      return;
    }

    repository.issues = repository.issues.filter((item: GitHubIssueModel) => item.uid !== this.issue.id);
  }

}
