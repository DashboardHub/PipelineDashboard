import { Account } from './account.model';
import { LoginAuditModel } from './loginAudit.model';
import { RepositoriesModel } from './repositories.model';

export class ProfileModel {
    uid: string = '';
    username: string;
    name: string = 'Guest';
    email: string = '';
    phone: string = '';
    avatarUrl: string = '';
    githubToken?: string;
    emailVerified: boolean = false;
    creationTime?: string;
    lastSignInTime?: string;
    account?: Account = new Account();
    logins?: LoginAuditModel[] = [];
    repositories?: RepositoriesModel = new RepositoriesModel();
}
