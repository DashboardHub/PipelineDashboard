import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { ProjectTokenModel } from '../../shared/models/index.model';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectTokensResolver implements Resolve<ProjectTokenModel[]> {

  constructor(
    private tokenService: TokenService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ProjectTokenModel[]> {
    return this.tokenService.findProjectTokens(route.params.projectUid)
      .pipe(
        take(1),
        catchError(() => {
          return of([]);
        })
      );
  }
}
