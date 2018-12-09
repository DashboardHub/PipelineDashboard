import { Account } from './account.model';
import { LoginAudit } from './loginAudit.model';

export class Profile {

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
    logins?: LoginAudit[] = [];
}
