// Angular modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// 3rd party
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { RepositoryService } from '@core/services/index.service';
import { PullRequestStatusModel } from '@shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class StatusResolver implements Resolve<PullRequestStatusModel> {

  /**
   * Life cycle method
   * @param respositoryService RepositoryService
   * @param router Router
   */
  constructor(
    private respositoryService: RepositoryService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PullRequestStatusModel> {
    return this.respositoryService.getPullRequestStatusByUid(route.params.repoUid, route.params.pullRequestUid)
      .pipe(
        take(1),
        catchError(() => {
          this.router.navigate(['/projects', route.params.projectUid]);

          return of(new PullRequestStatusModel());
        })
      );
  }
}
