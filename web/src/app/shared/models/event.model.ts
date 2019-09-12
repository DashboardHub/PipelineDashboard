import { firestore } from 'firebase';
import { RepositoryModel } from './repository.model';
import { UserModel } from './user.model';

export class EventModel {
  uid: string;
  type: string;
  public: string;
  actor: UserModel;
  repository: RepositoryModel;
  // organisation: input.org ? GitHubOrganisationMapper.import(input.org) : {},
  // payload: GitHubPayloadMapper.import(input.type, input.payload),
  createdOn: firestore.Timestamp;
}
