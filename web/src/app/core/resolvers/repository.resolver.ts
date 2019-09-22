// Angular modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// 3rd party
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { RepositoryService } from '@core/services/index.service';
import { RepositoryModel } from '@shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoryResolver implements Resolve<RepositoryModel> {

  constructor(
    private respositoryService: RepositoryService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<RepositoryModel> {
    return this.respositoryService.findOneById(route.params.repoUid)
      .pipe(
        take(1),
        catchError(() => {
          this.router.navigate(['/projects', route.params.projectUid]);
          return of(new RepositoryModel({ uid: '-' }));
        })
      );
  }
}
