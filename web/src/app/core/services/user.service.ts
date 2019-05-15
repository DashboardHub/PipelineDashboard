import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';

// Firestore modules
import { AngularFirestore } from '@angular/fire/firestore';

// Dashboard hub model and services
import { UserStatsModel, UserModel } from '../../shared/models/index.model';
import { SpinnerService } from './spinner.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private afs: AngularFirestore,
        private spinnerService: SpinnerService,
    ) {
    }

    // This function returns the user stats information
    public findAllUserStats(): Observable<UserStatsModel[]> {
        return this.spinnerService
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
        return this.spinnerService
            .start()
            .pipe(
                switchMap(() => this.afs.doc<UserModel>(`userStats/${userId}`).valueChanges()),
            );
    }
}
