import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public user: User;

    constructor(
        public afAuth: AngularFireAuth
    ) {
        this.afAuth.user.subscribe((user: User) => this.user = user);
    }

    public isAuthenticated(): boolean {
        return !!this.user;
    }

    public login(): void {
        this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
    }

    public logout(): void {
        this.afAuth.auth.signOut();
    }
}
