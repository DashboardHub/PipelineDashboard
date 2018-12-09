import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { from, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

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
        this.checkAuth()
            .subscribe((profile: Profile) => {
                this.profile = profile;
                this.isAuthenticated = true;
            });
    }

    public login(): void {
        from(this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider()))
            .subscribe((credentials: firebase.auth.UserCredential) => {
                from(credentials.user.getIdToken())
                    .subscribe((token: string) => {
                        this.profile = {
                            uid: credentials.user.uid,
                            username: credentials.additionalUserInfo.username,
                            name: credentials.user.displayName,
                            email: credentials.user.email,
                            phone: credentials.user.phoneNumber,
                            avatarUrl: credentials.user.photoURL,
                            githubToken: token,
                            emailVerified: credentials.user.emailVerified,
                            creationTime: credentials.user.metadata.creationTime,
                            lastSignInTime: credentials.user.metadata.lastSignInTime
                        }

                        this.isAuthenticated = true;

                        return this.afs.collection('users').doc(this.profile.uid).set(this.profile, { merge: true });
                    });
            });
    }

    public logout(): void {
        from(this.afAuth.auth.signOut())
            .subscribe(() => {
                this.profile = new Profile();
                this.isAuthenticated = false;
            });
    }

    private checkAuth(): Observable<Profile> {
        return this.afAuth.authState
            .pipe(
                filter((user: User) => !!user),
                switchMap((user: User) => this.afs
                    .doc<Profile>(`users/${user.uid}`)
                    .valueChanges()),
            );
    }
}
