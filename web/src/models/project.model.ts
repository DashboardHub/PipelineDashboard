import { RepositoryModel } from './repository';

export class ProjectModel {
    id?: string = '';
    type: 'private'|'public' = 'public';
    title: string = '';
    description: string = '';
    owners: string[] = [];
    repositores?: RepositoryModel[] = [];
    createdOn: Date;
    updatedOn: Date;
}
