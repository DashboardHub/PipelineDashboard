// Core modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

// Firestore modules
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

// Dashboard hub model and services
import { UserModel, UserStatsModel } from '@shared/models/index.model';
import { ActivityService } from './activity.service';
import { AuthenticationService } from './authentication.service';

/**
 * User service
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /**
   * Life cycle method
   * @param afs AngularFirestore
   * @param activityService ActivityService
   */
  constructor(
    private afs: AngularFirestore,
    private activityService: ActivityService,
    private authService: AuthenticationService
  ) {
  }

  /**
   * Find all the user stats information
   */
  public findAllUserStats(): Observable<UserStatsModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<UserStatsModel>(
            'userStats',
            (ref: firebase.firestore.Query) => ref
              .orderBy('lastUpdated', 'desc')
              .limit(4)
          )
          .valueChanges())
      );
  }

  /**
   * Find all the user information
   */
  public findAllUserList(): Observable<UserModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<UserModel>(
            'users',
            (ref: firebase.firestore.Query) => ref
              .orderBy('lastSignInTime', 'desc')
          )
          .valueChanges())
      );
  }

  /**
   * Find the user information by user id
   * @param userId user id of the user
   */
  public findUserStatsById(userId: string): Observable<UserModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.doc<UserModel>(`userStats/${userId}`).valueChanges())
      );
  }

  /**
   * Update the following array inside users collection based upon the update flag
   * @param projectUid string
   * @param isUpdate flag if user uid has to remove or array in following array
   */
  public updateFollowing(projectUid: string, isUpdate: boolean): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<UserModel>('users')
          .doc<any>(this.authService.profile.uid)
          .set(
            {
              following: isUpdate ? firebase.firestore.FieldValue.arrayUnion(projectUid) : firebase.firestore.FieldValue.arrayRemove(projectUid),
            },
            { merge: true })),
        take(1)
      );
  }
}
