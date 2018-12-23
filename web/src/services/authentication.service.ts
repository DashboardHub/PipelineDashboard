import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { from, Observable } from 'rxjs';
import { filter, concatMap, switchMap, tap, first, takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { ProfileModel, LoginAuditModel } from '../models/index.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public profile: ProfileModel = new ProfileModel();
    public isAuthenticated: boolean = false;

    constructor(
        public afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private deviceService: DeviceDetectorService,
    ) {
        this.checkAuth()
            .subscribe((profile: ProfileModel) => {
                this.profile = profile;
                this.isAuthenticated = true;
            });
    }

    public login(): void {
        const provider: auth.GithubAuthProvider = new auth.GithubAuthProvider();
        provider.addScope('repo,admin:repo_hook');
        from(this.afAuth.auth.signInWithPopup(provider))
            .pipe(
                filter((credentials: firebase.auth.UserCredential) => !!credentials),
                concatMap(
                    (credentials: firebase.auth.UserCredential) => from(credentials.user.getIdTokenResult()),
                    (credentials: firebase.auth.UserCredential, oauth: firebase.auth.IdTokenResult) => ({
                            uid: credentials.user.uid,
                            username: credentials.additionalUserInfo.username,
                            name: credentials.user.displayName,
                            email: credentials.user.email,
                            phone: credentials.user.phoneNumber,
                            avatarUrl: credentials.user.photoURL,
                            oauth: {
                                githubToken: credentials.credential.accessToken,
                                token: oauth.token,
                                expirationTime: oauth.expirationTime,
                                authTime: oauth.authTime,
                                issuedAtTime: oauth.issuedAtTime,
                                signInProvider: oauth.signInProvider,
                                claims: oauth.claims,
                            },
                            emailVerified: credentials.user.emailVerified,
                            creationTime: credentials.user.metadata.creationTime,
                            lastSignInTime: credentials.user.metadata.lastSignInTime
                        }),
                ),
                concatMap(
                    (profile: ProfileModel) => from(this.afs.collection<ProfileModel>('users')
                        .doc<ProfileModel>(profile.uid)
                        .set(profile, { merge: true })),
                    (profile: ProfileModel) => profile,
                ),
                concatMap(
                    (profile: ProfileModel) => from(this.afs.collection<ProfileModel>('users')
                        .doc<ProfileModel>(profile.uid)
                        .collection<LoginAuditModel>('logins')
                        .add({
                                date: new Date(),
                                userAgent: this.deviceService.getDeviceInfo().userAgent,
                                os: this.deviceService.getDeviceInfo().os,
                                browser: this.deviceService.getDeviceInfo().browser,
                                device: this.deviceService.getDeviceInfo().device,
                                osVersion: this.deviceService.getDeviceInfo().os_version,
                                browserVersion: this.deviceService.getDeviceInfo().browser_version,
                        })),
                    (profile: ProfileModel) => this.profile = profile,
                ),
            )
            .subscribe((profile: ProfileModel) => this.isAuthenticated = true);
    }

    public logout(): void {
        from(this.afAuth.auth.signOut())
            .pipe(first())
            .subscribe(() => {
                this.profile = new ProfileModel();
                this.isAuthenticated = false;
            });
    }

    public checkAuth(): Observable<ProfileModel> {
        return this.afAuth.authState
            .pipe(
                filter((user: User) => !!user),
                takeUntil<User>(this.getAuthState()),
                switchMap((user: User) => this.afs
                    .doc<ProfileModel>(`users/${user.uid}`)
                    .valueChanges()),
            );
    }

    public getLogins(): Observable<LoginAuditModel[]> {
        return this.afs.collection<ProfileModel>('users')
            .doc<ProfileModel>(this.profile.uid)
            .collection<LoginAuditModel>('logins', (ref: firebase.firestore.CollectionReference) => ref.orderBy('date', 'desc'))
            .valueChanges()
            .pipe(
                takeUntil<LoginAuditModel[]>(this.getAuthState()),
            );
    }

    private getAuthState(): Observable<User | null> {
        return this.afAuth
            .authState.pipe(
                filter((user: User) => !user),
            );
    }
}
