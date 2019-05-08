import { Component, Input } from '@angular/core';

// Dashboard hub model
import { ProjectModel } from '../../models/index.model';

@Component({
    selector: 'dashboard-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

    @Input()
    public projects: ProjectModel[] = [];
}
