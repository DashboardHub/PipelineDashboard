import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

// Dashboard hub model and services
import { ProjectModel, ProjectTokenModel } from '../../shared/models/index.model';
import { ProjectService } from '../services/index.service';
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
          this.router.navigate(['/']);
          return of(new ProjectTokenModel());
        })
      );
  }
}
