// Core modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Firestore modules
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as firebase from 'firebase';
import { auth, User } from 'firebase/app';

// Rxjs operators
import { from, of, Observable, Subscription } from 'rxjs';
import { concatMap, filter, first, switchMap, tap } from 'rxjs/operators';

// Third party modules
import { DeviceDetectorService } from 'ngx-device-detector';

// Dashboard hub models
import { LoginAuditModel, ProfileModel } from '@shared/models/index.model';
import { ActivityService } from './activity.service';

/**
 * Authentication service
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private subscriptions: Subscription[] = [];
  public isAuthenticated: boolean = false;
  public profile: ProfileModel = new ProfileModel();

  /**
   * Life cycle method
   * @param activityService ActivityService instance
   * @param afs AngularFireStore instance
   * @param deviceService DeviceDetectorService instance
   * @param fns AngularFireFunctions instance
   * @param router Router instance
   * @param afAuth AngularFireAuth instance
   */
  constructor(
    private activityService: ActivityService,
    private afs: AngularFirestore,
    private deviceService: DeviceDetectorService,
    private fns: AngularFireFunctions,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.checkAuth();
  }

  /**
   * Checks authentication state of user
   */
  public checkAuth(): void {
    const subscription: Subscription = this.afAuth.authState
      .pipe(
        filter((user: User) => !!user),
        switchMap((user: User) => this.afs
          .doc<ProfileModel>(`users/${user.uid}`)
          .valueChanges())
      )
      .subscribe((profile: ProfileModel) => {
        this.isAuthenticated = true;
        this.profile = profile;
      });

    this.subscriptions.push(subscription);
  }

  /**
   * Get all the logged in users list
   */
  public getLogins(): Observable<LoginAuditModel[]> {
    return this.afs.collection<ProfileModel>('users')
      .doc<ProfileModel>(this.profile.uid)
      .collection<LoginAuditModel>('logins', (ref: firebase.firestore.CollectionReference) => ref.orderBy('date', 'desc'))
      .valueChanges();
  }

  /**
   * Returns the profile information of user
   * @param uid uid of user
   */
  public getProfile(uid: string): Observable<ProfileModel> {
    return this.afs.collection<ProfileModel>('users')
      .doc<ProfileModel>(uid)
      .valueChanges();
  }

  /**
   * Login via github authentication
   */
  public login(): void {
    const provider: auth.GithubAuthProvider = new auth.GithubAuthProvider();
    provider.addScope('public_repo,admin:repo_hook');
    const subscription: Subscription = from(this.afAuth.auth.signInWithPopup(provider))
      .pipe(
        tap(() => this.activityService.setProgressBar(true)),
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
            lastSignInTime: credentials.user.metadata.lastSignInTime,
          })
        ),
        concatMap(
          (profile: ProfileModel) => from(this.afs.collection<ProfileModel>('users')
            .doc<ProfileModel>(profile.uid)
            .set(profile, { merge: true })),
          (profile: ProfileModel) => profile
        ),
        concatMap(
          (profile: ProfileModel) => from(this.afs.collection<ProfileModel>('users')
            .doc<ProfileModel>(profile.uid)
            .collection<LoginAuditModel>('logins')
            .add({
              date: firebase.firestore.Timestamp.fromDate(new Date()),
              userAgent: this.deviceService.getDeviceInfo().userAgent,
              os: this.deviceService.getDeviceInfo().os,
              browser: this.deviceService.getDeviceInfo().browser,
              device: this.deviceService.getDeviceInfo().device,
              osVersion: this.deviceService.getDeviceInfo().os_version,
              browserVersion: this.deviceService.getDeviceInfo().browser_version,
            })),
          (profile: ProfileModel) => this.profile = profile
        ),
        tap((profile: ProfileModel): Observable<ProfileModel> => {
          const callable: any = this.fns.httpsCallable('findAllUserEvents');
          callable({ token: profile.oauth.githubToken, username: profile.username });

          return of(profile);
        }),
        switchMap((profile: ProfileModel) => {
          const callable: any = this.fns.httpsCallable('findAllUserRepositories');
          return callable({ token: profile.oauth.githubToken });
        })
      )
      .subscribe(() => {
        this.isAuthenticated = true;
        this.activityService.setProgressBar(false);
        this.checkAuth();
      });

    this.subscriptions.push(subscription);
  }

  /**
   * Logout from dashboard hub
   */
  public logout(): void {
    from(this.afAuth.auth.signOut())
      .pipe(first())
      .subscribe(() => {
        this.profile = new ProfileModel();
        this.isAuthenticated = false;
        this.subscriptions.map((subscription: Subscription) => subscription.unsubscribe());
        this.router.navigate(['/']);
      });
  }
}
