import { RepositoryModel } from './repository.model';
import { AccessModel } from './access.model';

export class ProjectModel {
    uid?: string = '';
    type: 'private'|'public' = 'public';
    title: string = '';
    description: string = '';
    access: AccessModel = new AccessModel();
    repositores?: RepositoryModel[] = [];
    createdOn: Date;
    updatedOn: Date;
}
