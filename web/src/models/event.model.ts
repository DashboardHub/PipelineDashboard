import { UserModel } from './user.model';
import { RepositoryModel } from './repository.model';

export class EventModel {
    uid: string;
    type: string;
    public: string;
    actor: UserModel;
    repository: RepositoryModel;
    // organisation: input.org ? GitHubOrganisationMapper.import(input.org) : {},
    // payload: GitHubPayloadMapper.import(input.type, input.payload),
    createdOn: Date;
}
