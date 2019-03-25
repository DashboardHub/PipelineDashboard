import { RepositoryModel } from './repository.model';

export class ActivityModel {
    type: string;
    payload: { title: string };
    repository: RepositoryModel;
    createdOn: Date;
}
