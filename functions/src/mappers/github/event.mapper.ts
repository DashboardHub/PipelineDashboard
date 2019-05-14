import { GitHubEventType } from './event.mapper';
import { GitHubUserMapper, GitHubUserModel, GitHubUserInput } from './user.mapper';
import { GitHubOrganisationMapper, GitHubOrganisationtInput, GitHubOrganisationModel } from './organisation.mapper';
import { GitHubPayloadMapper, GitHubPayloadInput, GitHubPayloadModel } from './payload.mapper';
import { GitHubRepositoryMapper, GitHubRepositoryInput, GitHubRepositoryModel } from './repository.mapper';

export type GitHubEventType = 'PullRequestEvent' | 'IssueCommentEvent' | 'CreateEvent' | 'ReleaseEvent' | 'WatchEvent' | 'PushEvent' | 'IssuesEvent';

export interface GitHubEventInput {
    id: string;
    type: GitHubEventType;
    public: string;
    actor: GitHubUserInput;
    repo: GitHubRepositoryInput;
    org: GitHubOrganisationtInput;
    payload: GitHubPayloadInput;
    created_at: Date;
}

export interface GitHubEventModel {
    uid: string;
    type: GitHubEventType;
    public: string;
    actor: GitHubUserModel;
    repository: GitHubRepositoryModel;
    organisation?: GitHubOrganisationModel;
    payload: GitHubPayloadModel;
    createdOn: Date;
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
