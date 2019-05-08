import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ProjectModel } from '../../models/index.model';
import { ProjectService } from '../../../core/services/project.service';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard-projects-public',
    templateUrl: './public.component.html',
})
export class PublicProjectsComponent implements OnInit {

    private projectSubscription: Subscription;
    public projects: ProjectModel[] = [];
    @Input() title: string = 'My Projects';

    constructor(
        private projectService: ProjectService,
        private router: Router,
        private authService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.authService.setProgressBar(true);
        if (this.router.url === '/') {
            this.projectSubscription = this.projectService
                .findPublicProjects()
                .subscribe((projects: ProjectModel[]) => {
                    this.projects = projects;
                    this.authService.setProgressBar(false);
                });
        } else {
            this.projectSubscription = this.projectService
                .findMyProjects()
                .subscribe((projects: ProjectModel[]) => {
                    this.projects = projects;
                    this.authService.setProgressBar(false);
                });
        }
    }

    ngDestroy(): void {
        this.projectSubscription
            .unsubscribe();
    }
}
