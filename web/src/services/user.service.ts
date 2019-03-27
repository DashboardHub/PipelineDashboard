import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserStatsModel } from '../models/index.model';
import { from, Observable, } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private afs: AngularFirestore,
        private authService: AuthenticationService,
    ) {
    }

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
