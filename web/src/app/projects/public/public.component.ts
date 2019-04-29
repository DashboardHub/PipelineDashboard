import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { ProjectModel } from '../../shared/models/index.model';
import { Subscription } from 'rxjs';

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
