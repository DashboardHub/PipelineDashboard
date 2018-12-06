import { RepositoryModel } from './repository';

export class ProjectModel {
    id: string = '';
    name: string = '';
    repositores: RepositoryModel[] = [];
}
