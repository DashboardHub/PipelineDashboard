import { PullRequestModel } from './pullRequest.model';

export class RepositoryModel {
    uid?: string;
    id?: string;
    name?: string;
    description?: string;
    fullName: string;
    owner?: string;
    ownerId?: string;
    private?: boolean;
    fork?: string;
    archived?: string;
    forks?: number;
    stargazers?: string;
    watchers?: number;
    branch?: string;
    issues?: number;
    license?: string;
    pullRequests?: PullRequestModel[];

    constructor(fullName: string) {
        this.fullName = fullName;
        this.uid = fullName.replace('/', '+');
    }
}
