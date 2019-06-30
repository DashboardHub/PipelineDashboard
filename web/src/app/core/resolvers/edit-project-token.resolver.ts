// Angular modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// Third party modules
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { ProjectTokenModel } from '../../shared/models/index.model';
import { ProjectTokenService } from '../services/index.service';

@Injectable({
  providedIn: 'root',
})
export class EditProjectTokenResolver implements Resolve<ProjectTokenModel> {

  constructor(
    private projectTokenService: ProjectTokenService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): any {
    return this.projectTokenService.findOneById(route.params.projectUid, route.params.uid)
      .pipe(
        take(1),
        catchError(() => {
          this.router.navigate(['/']);
          return of(new ProjectTokenModel());
        })
      );
  }
}
