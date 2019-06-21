import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { ProjectTokenModel } from '../../shared/models/index.model';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class EditProjectTokenResolver implements Resolve<ProjectTokenModel> {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): any {
    return this.tokenService.findOneById(route.params.projectUid, route.params.uid)
      .pipe(
        take(1),
        catchError(() => {
          return of(new ProjectTokenModel());
        })
      );
  }
}
