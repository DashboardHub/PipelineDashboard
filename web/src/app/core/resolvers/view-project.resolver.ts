import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { ProjectModel } from '../../../models/index.model';
import { ProjectService } from '../services/project.service';

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
