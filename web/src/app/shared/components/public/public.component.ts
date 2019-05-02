import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { ProjectModel } from '../../models/index.model';
import { ProjectService } from '../../../core/services/project.service';

@Component({
    selector: 'dashboard-projects-public',
    templateUrl: './public.component.html',
})
export class PublicProjectsComponent implements OnInit {

    private projectSubscription: Subscription;
    public projects: ProjectModel[] = [];

    constructor(
        private projectService: ProjectService
    ) {
    }

    ngOnInit(): void {
        this.projectSubscription = this.projectService
            .findPublicProjects()
            .subscribe((projects: ProjectModel[]) => this.projects = projects);
    }

    ngDestroy(): void {
        this.projectSubscription
            .unsubscribe();
    }
}
