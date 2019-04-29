import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { ProfileModel } from '../models/index.model';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../app/core/services/authentication.service';

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
