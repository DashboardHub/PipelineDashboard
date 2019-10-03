// Core modules
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

// Third party modules
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { AuthenticationService } from '@core/services/index.service';
import { ProfileModel } from '@shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<ProfileModel> {

  /**
   * Life cycle method
   * @param authService AuthenticationService
   * @param router Router
   */
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  /**
   * Find all profile data before showing profile page
   */
  resolve(): Observable<ProfileModel> {

    return this.authService.getCurrentUser()
      .pipe(
        take(1),
        catchError(() => {
          this.router.navigate(['/']);

          return of(new ProfileModel());
        })
      );
  }
}
