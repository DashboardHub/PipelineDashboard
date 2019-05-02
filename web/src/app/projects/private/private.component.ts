import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub services and models
import { ProjectService } from '../../core/services/project.service';
import { ProjectModel } from '../../shared/models/index.model';

@Component({
    selector: 'dashboard-projects-private',
    templateUrl: './private.component.html',
})
export class PrivateProjectsComponent implements OnInit {

    private projectSubscription: Subscription;
    public projects: ProjectModel[] = [];

    constructor(
        private projectService: ProjectService
    ) {
    }

    ngOnInit(): void {
        this.projectSubscription = this.projectService
            .findMyProjects()
            .subscribe((projects: ProjectModel[]) => this.projects = projects);
    }

    ngDestroy(): void {
        this.projectSubscription
            .unsubscribe();
    }
}
