export class RepositoryModel {
    uid: string;
    id?: string;
    name?: string;
    description: string;
    fullName: string;
    owner?: string;
    ownerId?: string;
    private: string;
    fork?: string;
    archived?: string;
    forks?: number;
    stargazers?: string;
    watchers?: number;
    branch?: string;
    issues?: number;
    license?: string;

    constructor(fullName: string) {
        this.fullName = fullName;
        this.uid = fullName.replace('/', '+');
    }
}
