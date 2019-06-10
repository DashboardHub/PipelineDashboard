import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// Dashboard hub model and services
import { ProjectModel } from '../../shared/models/index.model';
import { ProjectService } from '../services/index.service';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ViewProjectResolver implements Resolve<ProjectModel> {

    constructor(
        private projectService: ProjectService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ProjectModel> {
        return this.projectService.findOneById(route.params.uid)
            .pipe(
                take(1),
                switchMap((project: ProjectModel) => {
                    // for private project must have access
                    if (!project || (project.type === 'private' && (!this.projectService.hasAccess(project) || !this.projectService.isAdmin(project)))) {
                        this.router.navigate(['/']);
                        return of(new ProjectModel());
                    }

                    return of(project);
                }),
                catchError(() => {
                    this.router.navigate(['/']);
                    return of(new ProjectModel());
                })
            );
    }
}
