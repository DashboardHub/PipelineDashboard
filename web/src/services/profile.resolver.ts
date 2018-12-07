import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<User> {

    constructor(private afAuth: AngularFireAuth) {
    }

    resolve(): Observable<User> {
        return this.afAuth.user;
    }
}
