// Core modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

// Dashboard hub model and services
import { AuthenticationService, ProjectService } from '@core/services/index.service';
import { IProject, ProjectModel } from '@shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class EditProjectResolver implements Resolve<IProject> {

  /**
   * Life cycle method
   * @param authService AuthenticationService
   * @param projectService ProjectService
   * @param router Router
   */
  constructor(
    private authService: AuthenticationService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  /**
   * Allow owner to edit project routes only
   * @param route ActivatedRouteSnapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<IProject> {
    return this.projectService.findOneById(route.params.projectUid)
      .pipe(
        take(1),
        switchMap((project: ProjectModel) => {
          // for private project must have access
          if (!project || (project.type === 'private' && !project.isAdmin(this.authService.profile.uid))) {
            this.router.navigate(['/projects']);

            return of(new ProjectModel({ uid: 'error'}));
          }

          return of(project);
        }),
        catchError(() => {
          this.router.navigate(['/projects']);

          return of(new ProjectModel({ uid: 'error'}));
        })
      );
  }
}
