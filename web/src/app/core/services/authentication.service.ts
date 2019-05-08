import { Injectable } from '@angular/core';

// Firestore modules
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { auth, User } from 'firebase/app';

// Rxjs operators
import { from, Observable, of, Subject } from 'rxjs';
import { filter, concatMap, switchMap, first, takeUntil, tap } from 'rxjs/operators';

// Third party modules
import { DeviceDetectorService } from 'ngx-device-detector';

// Dashboard hub models
import { ProfileModel, LoginAuditModel } from '../../shared/models/index.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private spinnerSubject: Subject<Boolean> = new Subject();
    public profile: ProfileModel = new ProfileModel();
    public isAuthenticated: boolean = false;

    constructor(
        public afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private fns: AngularFireFunctions,
        private deviceService: DeviceDetectorService,
        ) {
        this.checkAuth()
            .pipe(
                switchMap((profile: ProfileModel): Observable<ProfileModel> => this.getProfile(profile.uid)),
            )
            .subscribe((profile: ProfileModel) => {
                this.isAuthenticated = true;
                this.profile = profile;
            });
    }

    // This function checks authentication state of user
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

    // This function returns all the logged in users list
    public getLogins(): Observable<LoginAuditModel[]> {
        return this.afs.collection<ProfileModel>('users')
            .doc<ProfileModel>(this.profile.uid)
            .collection<LoginAuditModel>('logins', (ref: firebase.firestore.CollectionReference) => ref.orderBy('date', 'desc'))
            .valueChanges()
            .pipe(
                takeUntil<LoginAuditModel[]>(this.getAuthState()),
            );
    }

    // This function returns the profile information of user
    public getProfile(uid: string): Observable<ProfileModel> {
        return this.afs.collection<ProfileModel>('users')
            .doc<ProfileModel>(uid)
            .valueChanges()
            .pipe(
                switchMap((profile: ProfileModel): Observable<ProfileModel> => {
                    const callable: any = this.fns.httpsCallable('getUserEvents');
                    callable({ token: profile.oauth.githubToken, username: profile.username, });

                    return of(profile);
                }),
            );
    }

    // This function used to login via github
    public login(): void {
        this.setProgressBar(true);
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
                            // @ts-ignore
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
            .subscribe(() => {
                this.isAuthenticated = true;
                this.setProgressBar(false);
            });
    }

    // This function is used for logout from dashboard hub
    public logout(): void {
        from(this.afAuth.auth.signOut())
            .pipe(first())
            .subscribe(() => {
                this.profile = new ProfileModel();
                this.isAuthenticated = false;
            });
    }

    // This function will set the progress bar status
    public setProgressBar(status: boolean): void {
       this.spinnerSubject.next(status);
    }

    // this function will return the status of progress bar to main component
    public getProgressBar(): Observable<Boolean> {
        return this.spinnerSubject.asObservable();
    }

    // This function returns the authenticated user state
    private getAuthState(): Observable<User | null> {
        return this.afAuth
            .authState.pipe(
                filter((user: User) => !user),
            );
    }
}
