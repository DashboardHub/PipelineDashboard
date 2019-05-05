import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

// Dashboard hub model and services
import { AuthenticationService } from '../services/authentication.service';
import { ProjectModel } from '../../shared/models/index.model';
import { ProjectService } from '../services/project.service';

@Injectable({
    providedIn: 'root'
})
export class EditProjectResolver implements Resolve<boolean> {

    constructor(
        private authService: AuthenticationService,
        private projectService: ProjectService,
        private router: Router
        ) {
    }

    resolve(route: ActivatedRouteSnapshot): any {
        this.projectService.findOneById(route.params.uid)
        .subscribe((project: ProjectModel) => {
            // Added check for not authenticated user and private project details as well for their ownner
            if (project.type === 'private' && !this.authService.isAuthenticated ||
               !project.access.admin.includes(this.authService.profile.uid)) {
                this.router.navigate(['/']);
            }
        });
    }
}
