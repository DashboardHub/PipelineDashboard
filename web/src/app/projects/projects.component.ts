import { Component, Input } from '@angular/core';
import { ProjectModel } from '../shared/models/index.model';

@Component({
    selector: 'dashboard-projects',
    templateUrl: './projects.component.html',
})
export class ProjectsComponent {

    @Input()
    public projects: ProjectModel[] = [];
}
