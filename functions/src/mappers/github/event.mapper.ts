import { GitHubUserMapper } from './user.mapper';
import { GitHubOrganisationMapper } from './organisation.mapper';
import { GitHubPayloadMapper } from './payload.mapper';

export class GitHubEventMapper {
    static import(input: any) {
        return {
            uid: input.id,
            type: input.type,
            public: input.public,
            actor: GitHubUserMapper.import(input.actor),
            organisation: input.org ? GitHubOrganisationMapper.import(input.org) : {},
            payload: GitHubPayloadMapper.import(input.type, input.payload),
            createdOn: input.created_at,
        };
    }
}
