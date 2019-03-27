import { RepositoryModel } from './repository.model';

export class ActivityModel {
    type: string;
    payload: { title: string, action?: string };
    repository: RepositoryModel;
    createdOn: Date;
}
