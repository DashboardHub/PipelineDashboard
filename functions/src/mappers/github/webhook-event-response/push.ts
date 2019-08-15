import { firestore } from "firebase-admin";
import { GitHubEventModel, GitHubEventType } from "../event.mapper";
import { GitHubPayloadInput, GitHubPayloadMapper } from "../payload.mapper";
import { GitHubRepositoryMapper } from "../repository.mapper";
import { GitHubUserMapper } from "../user.mapper";
import { isExistProperties, HubEventActions, Repository, User } from "./shared";

interface Pusher {
  name: string;
  email: string;
}

export interface PushEventInput {
  ref: string;
  before: string;
  after: string;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  base_ref?: any;
  compare: string;
  commits: any[];
  head_commit?: any;
  repository: Repository;
  pusher: Pusher;
  sender: User;
}


export class PushEventModel implements PushEventInput, HubEventActions {
  ref: string;
  before: string;
  after: string;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  base_ref?: any;
  compare: string;
  commits: any[];
  head_commit?: any;
  repository: Repository;
  pusher: Pusher;
  sender: User;

  constructor(input: PushEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['ref', 'before', 'after', 'created', 'deleted', 'forced', 'base_ref', 'compare', 'commits', 'head_commit', 'repository', 'pusher', 'sender'];
    return isExistProperties(input, requireKeys);
  }

  convertToHubEvent(): GitHubEventModel {
    const eventType: GitHubEventType = 'PushEvent';
    const payload: GitHubPayloadInput = {
      ref: this.ref,
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
