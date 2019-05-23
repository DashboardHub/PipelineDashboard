// Third party modules
import { firestore } from 'firebase-admin';

// Dashboard hub firebase functions mappers/modesl
import { GitHubEventType } from './event.mapper';
import { GitHubOrganisationtInput, GitHubOrganisationMapper, GitHubOrganisationModel } from './organisation.mapper';
import { GitHubPayloadInput, GitHubPayloadMapper, GitHubPayloadModel } from './payload.mapper';
import { GitHubRepositoryInput, GitHubRepositoryMapper, GitHubRepositoryModel } from './repository.mapper';
import { GitHubUserInput, GitHubUserMapper, GitHubUserModel } from './user.mapper';

export type GitHubEventType = 'PullRequestEvent' | 'IssueCommentEvent' | 'CreateEvent' | 'ReleaseEvent' | 'WatchEvent' | 'PushEvent' | 'IssuesEvent';

export interface GitHubEventInput {
  id: string;
  type: GitHubEventType;
  public: string;
  actor: GitHubUserInput;
  repo: GitHubRepositoryInput;
  org: GitHubOrganisationtInput;
  payload: GitHubPayloadInput;
  created_at: firestore.Timestamp;
}

export interface GitHubEventModel {
  uid: string;
  type: GitHubEventType;
  public: string;
  actor: GitHubUserModel;
  repository: GitHubRepositoryModel;
  organisation?: GitHubOrganisationModel;
  payload: GitHubPayloadModel;
  createdOn: firestore.Timestamp;
}

export class GitHubEventMapper {
  static import(input: GitHubEventInput): GitHubEventModel {
    const data: GitHubEventModel = {
      uid: input.id,
      type: input.type,
      public: input.public,
      actor: GitHubUserMapper.import(input.actor),
      repository: GitHubRepositoryMapper.import(input.repo, 'event'),
      payload: GitHubPayloadMapper.import(input.type, input.payload),
      createdOn: input.created_at,
    };

    if (input.org) {
      data.organisation = GitHubOrganisationMapper.import(input.org);
    }

    return data;
  }
}
