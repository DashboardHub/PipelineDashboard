import { Account } from './account.model';
import { ActivityModel } from './activity.model';
import { LoginAuditModel } from './loginAudit.model';
import { RepositoriesModel } from './repositories.model';

export class ProfileModel {
    uid: string = '';
    username: string;
    name: string = 'Guest';
    email: string = '';
    phone: string = '';
    avatarUrl: string = '';
    oauth?: {
        githubToken: string;
        token: string;
        expirationTime: string;
        authTime: string;
        issuedAtTime: string;
        signInProvider: string | null;
        claims: {
            [key: string]: any;
        }
    };
    emailVerified: boolean = false;
    creationTime?: string;
    lastSignInTime?: string;
    account?: Account = new Account();
    logins?: LoginAuditModel[] = [];
    repositories?: RepositoriesModel = new RepositoriesModel();
    activity?: ActivityModel[] = [];
}
