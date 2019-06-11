import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Firestore modules
import { AngularFirestore } from '@angular/fire/firestore';

// Dashboard hub model and services
import { UserModel, UserStatsModel } from '../../shared/models/index.model';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private afs: AngularFirestore,
    private activityService: ActivityService,
  ) {
  }

  // This function returns the user stats information
  public findAllUserStats(): Observable<UserStatsModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<UserStatsModel>(
            'userStats',
            (ref: firebase.firestore.Query) => ref.orderBy('lastUpdated', 'desc')
          )
          .valueChanges()),
      );
  }

  // This function returns the user information
  public findUserStatsById(userId: string): Observable<UserModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.doc<UserModel>(`userStats/${userId}`).valueChanges()),
      );
  }
}
