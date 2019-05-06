import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

// Rxjs operators
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

// Dashboard hub model and services
import { ProfileModel } from '../../shared/models/index.model';
import { AuthenticationService } from '../services/authentication.service';

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
