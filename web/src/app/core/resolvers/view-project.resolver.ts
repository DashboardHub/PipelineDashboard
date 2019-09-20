// Core modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// Third party modules
import { AngularFireFunctions } from '@angular/fire/functions';
import { of, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

// Dashboard hub model and services
import { ProjectService } from '@core/services/index.service';
import { IProject, ProjectModel } from '@shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class ViewProjectResolver implements Resolve<IProject> {

  /**
   * Life cycle method
   * @param fns AngularFireFunctions instance
   * @param projectService ProjectService instance
   * @param router Router instance
   */
  constructor(
    private fns: AngularFireFunctions,
    private projectService: ProjectService,
    private router: Router
  ) { }

  /**
   * Find all project data before showing projects page
   * @param route ActivatedRouteSnapshot instance
   */
  resolve(route: ActivatedRouteSnapshot): Observable<IProject> {
    const callable: any = this.fns.httpsCallable('updateProjectViews');
    return this.projectService.findOneById(route.params.projectUid)
      .pipe(
        take(1),
        tap(() => callable({ projectUid: route.params.projectUid })),
        catchError(() => {
          this.router.navigate(['/']);
          return of(new ProjectModel({ uid: 'error' }));
        })
      );
  }
}
