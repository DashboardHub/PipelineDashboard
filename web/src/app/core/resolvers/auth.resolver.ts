// Angular modules
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ProfileModel } from '../../shared/models/index.model';
import { AuthenticationService } from '../services/index.service';

// Dashboard hub model and services

@Injectable({
  providedIn: 'root',
})
export class AuthResolver {

  constructor(
    private authService: AuthenticationService
  ) { }

  resolve(): Observable<ProfileModel> {
    return this.authService.checkAuth().pipe(
      take(1),
      catchError(() => of(new ProfileModel()))
    );
  }
}
