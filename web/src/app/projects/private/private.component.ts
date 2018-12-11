import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { ProjectModel } from '../../../models/index.model';
import { Subscription } from 'rxjs';

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
