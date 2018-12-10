import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { from, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ProfileModel } from '../models/index.model';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<ProfileModel> {

    constructor(private authService: AuthenticationService) {
    }

    resolve(): Observable<ProfileModel> {
        return this.authService
            .checkAuth()
            .pipe(first());
    }
}
