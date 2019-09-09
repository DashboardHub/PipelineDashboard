import { DocumentData } from '../../../client/firebase-admin';
import { GitHubMilestoneModel } from '../milestone.mapper';
import { GitHubUserMapper } from '../user.mapper';
import { isExistProperties, Milestone, Repository, User } from './shared';

type Action = 'created' | 'closed' | 'opened' | 'edited' | 'deleted';

export interface MilestoneEventInput {
  action: Action;
  milestone: Milestone;
  repository: Repository;
  sender: User;
}

export class MilestoneEventModel implements MilestoneEventInput {
  action: Action;
  milestone: Milestone;
  repository: Repository;
  sender: User;

  constructor(input: MilestoneEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'milestone', 'repository', 'sender'];
    return isExistProperties(input, requireKeys);
  }

  updateData(repository: DocumentData): void {

    if (!Array.isArray(repository.milestones)) {
      repository.milestones = [];
    }

    switch (this.action) {
      case 'created': {
        this.created(repository);
        break;
      }
      case 'opened': {
        this.opened(repository);
        break;
      }
      case 'closed': {
        this.closed(repository);
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

      default: {
        throw new Error('Not found action');
      }
    }

  }

  private getModel(): GitHubMilestoneModel {
    return {
      uid: this.milestone.id,
      title: this.milestone.title,
      creator: GitHubUserMapper.import(this.milestone.creator),
      state: this.milestone.state,
      openIssues: this.milestone.open_issues,
      closeIssues: this.milestone.closed_issues,
      htmlUrl: this.milestone.html_url,
      description: this.milestone.description,
      updatedAt: this.milestone.updated_at,
    };
  }

  private created(repository: DocumentData): void {

    const milestone: GitHubMilestoneModel = this.getModel();

    repository.milestones.unshift(milestone);
  }

  private opened(repository: DocumentData): void {
    this.edited(repository);
  }

  private closed(repository: DocumentData): void {
    this.edited(repository);
  }

  private edited(repository: DocumentData): void {
    const foundIndex: number = repository.milestones.findIndex((elem: GitHubMilestoneModel) => elem.uid === this.milestone.id);
    if (foundIndex > -1) {
      repository.milestones[foundIndex] = this.getModel();
    } else {
      this.created(repository);
    }
  }


  private deleted(repository: DocumentData): void {
    if (!Array.isArray(repository.milestones)) {
      return;
    }
    repository.milestones = repository.milestones.filter((item: GitHubMilestoneModel) => item.uid !== this.milestone.id);
  }

}
