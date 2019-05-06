import { AccessModel } from './access.model';

export class ProjectModel {
    uid?: string = '';
    type?: 'private'|'public' = 'public';
    title?: string = '';
    description?: string = '';
    access?: AccessModel = new AccessModel();
    repositories?: string[] = [];
    createdOn?: Date;
    updatedOn: Date;
}
