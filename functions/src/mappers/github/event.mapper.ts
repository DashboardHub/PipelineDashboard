import { GitHubUserMapper } from './user.mapper';
import { GitHubOrganisationMapper } from './organisation.mapper';
import { GitHubPayloadMapper } from './payload.mapper';
import { GitHubRepositoryMapper } from './repository.mapper';

export class GitHubEventMapper {
    static import(input: any) {
        return {
            uid: input.id,
            type: input.type,
            public: input.public,
            actor: GitHubUserMapper.import(input.actor),
            repository: GitHubRepositoryMapper.import(input.repo, 'event'),
            organisation: input.org ? GitHubOrganisationMapper.import(input.org) : {},
            payload: GitHubPayloadMapper.import(input.type, input.payload),
            createdOn: input.created_at,
        };
    }
}
