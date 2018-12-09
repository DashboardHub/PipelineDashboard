import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { from, Observable } from 'rxjs';
import { filter, concatMap, switchMap, tap } from 'rxjs/operators';

import { Profile, LoginAudit } from '../models/index.model';

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
            .pipe(
                filter((credentials: firebase.auth.UserCredential) => !!credentials),
                concatMap(
                    (credentials: firebase.auth.UserCredential) => from(credentials.user.getIdToken()),
                    (credentials: firebase.auth.UserCredential, token: string) => ({
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
                        })
                ),
                concatMap(
                    (profile: Profile) => from(this.afs.collection<Profile>('users')
                        .doc<Profile>(profile.uid)
                        .set(profile, { merge: true })),
                    (profile: Profile) => profile,
                ),
                concatMap(
                    (profile: Profile) => from(this.afs.collection<Profile>('users')
                        .doc<Profile>(profile.uid)
                        .collection<LoginAudit>('logins')
                        .add({ date: new Date().toString() })),
                    (profile: Profile) => profile,
                ),
            )
            .subscribe((profile: Profile) => this.isAuthenticated = true);
    }

    public logout(): void {
        from(this.afAuth.auth.signOut())
            .subscribe(() => {
                this.profile = new Profile();
                this.isAuthenticated = false;
            });
    }

    public checkAuth(): Observable<Profile> {
        return this.afAuth.authState
            .pipe(
                filter((user: User) => !!user),
                switchMap((user: User) => this.afs
                    .doc<Profile>(`users/${user.uid}`)
                    .valueChanges()),
            );
    }

    public getLogins(): Observable<LoginAudit[]> {
        return from(this.afs.collection<Profile>('users')
            .doc<Profile>(this.profile.uid)
            .collection<LoginAudit>('logins')
            .valueChanges());
    }
}
