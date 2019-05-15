import { RepositoryModel } from './index.model';

export class ActivityModel {
    type: string;
    payload: { title: string, action?: string };
    repository: RepositoryModel;
    createdOn: Date;
}
