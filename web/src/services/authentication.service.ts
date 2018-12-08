import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Profile } from '../models/index.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public profile: Profile;
    public isAuthenticated: boolean = false;

    constructor(
        public afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    ) {
        this.afAuth.user
            .pipe(
                filter((user: User) => !!user)
            )
            .subscribe((user: User) => {
                from(user.getIdToken())
                    .subscribe((token: string) => {
                        this.profile = {
                            uid: user.uid,
                            name: user.displayName,
                            email: user.email,
                            phone: user.phoneNumber,
                            avatarUrl: user.photoURL,
                            githubToken: token,
                            emailVerified: user.emailVerified,
                            creationTime: user.metadata.creationTime,
                            lastSignInTime: user.metadata.lastSignInTime
                        };

                        this.isAuthenticated = true;

                        return this.afs.collection('users').doc(user.uid).set(this.profile, { merge: true });
                    });
            });
    }

    public login(): void {
        this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
    }

    public logout(): void {
        from(this.afAuth.auth.signOut())
            .subscribe(() => {
                this.profile = new Profile();
                this.isAuthenticated = false;
            });
    }
}
