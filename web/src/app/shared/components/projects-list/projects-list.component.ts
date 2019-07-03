import { Component, Input } from '@angular/core';

// Dashboard hub model
import { ProjectModel } from '../../models/index.model';

@Component({
  selector: 'dashboard-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {

  @Input()
  public projects: ProjectModel[] = [];
}
