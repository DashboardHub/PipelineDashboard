import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

// Dashboard hub model and services
import { IProject, ProjectModel } from '../../shared/models/index.model';
import { ProjectService } from '../services/index.service';

@Injectable({
  providedIn: 'root',
})
export class ViewProjectResolver implements Resolve<IProject> {

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IProject> {
    return this.projectService.findOneById(route.params.projectUid)
      .pipe(
        take(1),
        switchMap((project: IProject) => {
          // for private project must have access
          if (!project || (project.type === 'private' && !this.projectService.hasAccess(project) && !this.projectService.isAdmin(project))) {
            this.router.navigate(['/']);

            return of(new ProjectModel({ uid: 'error'}));
          }

          return of(project);
        }),
        switchMap((project: IProject) => this.projectService.incrementView(project)),
        catchError(() => {
          this.router.navigate(['/']);
          return of(new ProjectModel({ uid: 'error'}));
        })
      );
  }
}
