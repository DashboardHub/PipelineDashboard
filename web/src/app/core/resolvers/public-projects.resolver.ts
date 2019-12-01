// Core modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

// Third party modules
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// Dashboard hub model and services
import { ProjectService } from '@core/services/index.service';
import { IProject } from '@shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class PublicProjectResolver implements Resolve<IProject[]> {

  /**
   * Life cycle method
   * @param fns AngularFireFunctions
   * @param projectService ProjectService
   * @param router Router
   */
  constructor(
    private projectService: ProjectService
  ) { }

  /**
   * Find all project data before showing projects page
   * @param route ActivatedRouteSnapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<IProject[]> {
    return this.projectService.findPublicProjects()
      .pipe(
        take(1)
      );
  }
}
