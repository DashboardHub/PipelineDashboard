import { Account } from './account.model';

export class Profile {

    uid: string = '';
    // login: string;
    name: string = 'Guest';
    email: string = '';
    phone: string = '';
    avatarUrl: string = '';
    githubToken?: string;
    emailVerified: boolean = false;
    creationTime?: string;
    lastSignInTime?: string;
    account?: Account = new Account();
}
