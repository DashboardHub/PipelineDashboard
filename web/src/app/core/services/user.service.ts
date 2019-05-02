import { Injectable } from '@angular/core';
import { from, Observable, } from 'rxjs';

// Firestore modules
import { AngularFirestore } from '@angular/fire/firestore';

// Dashboard hub model and services
import { AuthenticationService } from './authentication.service';
import { UserStatsModel } from '../../shared/models/index.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private afs: AngularFirestore,
        private authService: AuthenticationService,
    ) {
    }

    // This function returns the user information
    public findUserStats(): Observable<UserStatsModel[]> {
        return from(this.afs
            .collection<UserStatsModel>(
                'userStats',
                (ref: firebase.firestore.Query) => ref.orderBy('lastUpdated', 'desc')
            )
            .valueChanges()
        );
    }
}
