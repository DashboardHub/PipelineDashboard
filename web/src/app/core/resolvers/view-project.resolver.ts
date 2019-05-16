import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

// Dashboard hub model and services
import { AuthenticationService, ProjectService } from '../services/index.service';
import { ProjectModel } from '../../shared/models/index.model';

@Injectable({
    providedIn: 'root'
})
export class ViewProjectResolver implements Resolve<boolean> {

    constructor(
        private authService: AuthenticationService,
        private projectService: ProjectService,
        private router: Router
        ) {}

    resolve(route: ActivatedRouteSnapshot): any {
        this.projectService.findOneById(route.params.uid)
        .subscribe((project: ProjectModel) => {
            // Added check for not authenticated user and private project details
            if (project.type === 'private' && !this.authService.isAuthenticated) {
                this.router.navigate(['/']);
            }
        });
    }
}
