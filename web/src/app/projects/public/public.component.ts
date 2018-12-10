import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { ProjectModel } from '../../../models/index.model';

@Component({
    selector: 'dashboard-projects-public',
    templateUrl: './public.component.html',
})
export class PublicProjectsComponent implements OnInit {

    public projects: ProjectModel[] = [];

    constructor(
        private projectService: ProjectService
    ) {
    }

    ngOnInit(): void {
        this.projectService
            .findPublicProjects()
            .subscribe((projects: ProjectModel[]) => this.projects = projects);
    }
}
