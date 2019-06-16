import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

// Dashboard hub model and services
import { ProjectModel } from '../../shared/models/index.model';
import { ProjectService } from '../services/index.service';

@Injectable({
  providedIn: 'root',
})
export class EditProjectResolver implements Resolve<boolean> {

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): any {
    return this.projectService.findOneById(route.params.uid)
      .pipe(
        take(1),
        switchMap((project: ProjectModel) => {
          // for private project must have access
          if (!project || (project.type === 'private' && !this.projectService.isAdmin(project))) {
            this.router.navigate(['/projects']);
            return of(new ProjectModel());
          }

          return of(project);
        }),
        catchError(() => {
          this.router.navigate(['/projects']);
          return of(new ProjectModel());
        })
      );
  }
}
