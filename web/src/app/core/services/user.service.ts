import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

// Firestore modules
import { AngularFirestore } from '@angular/fire/firestore';

// Dashboard hub model and services
import { UserModel, UserStatsModel } from '../../shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  // This function returns the user stats information
  public findAllUserStats(): Observable<UserStatsModel[]> {
    return from(this.afs
      .collection<UserStatsModel>(
        'userStats',
        (ref: firebase.firestore.Query) => ref.orderBy('lastUpdated', 'desc')
      )
      .valueChanges()
    );
  }

  // This function returns the user information
  public findUserStatsById(userId: string): Observable<UserModel> {
    return this.afs
      .doc<UserModel>(`userStats/${userId}`)
      .valueChanges();
  }
}
