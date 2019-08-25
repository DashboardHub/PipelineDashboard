// Angular modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// Third party modules
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { TokenModel } from '@shared/models/index.model';
import { TokenService } from '../services/index.service';

@Injectable({
  providedIn: 'root',
})
export class EditTokenResolver implements Resolve<TokenModel> {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<TokenModel> {
    return this.tokenService.findOneById(route.params.projectUid, route.params.uid)
      .pipe(
        take(1),
        catchError(() => {
          this.router.navigate(['/']);
          return of(new TokenModel());
        })
      );
  }
}
