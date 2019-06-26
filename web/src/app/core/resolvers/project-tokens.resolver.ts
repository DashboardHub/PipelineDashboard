import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

// Third party modules
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { ProjectTokenModel } from '../../shared/models/index.model';
import { ProjectTokenService } from '../services/project-token.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectTokensResolver implements Resolve<ProjectTokenModel[]> {

  constructor(
    private projectTokenService: ProjectTokenService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ProjectTokenModel[]> {
    return this.projectTokenService.findAll(route.params.projectUid)
      .pipe(
        take(1),
        catchError(() =>  of([]))
      );
  }
}
