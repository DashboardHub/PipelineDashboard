import { Component, Input, OnChanges } from '@angular/core';

// Dashboard hub model
import { IProject, ProjectModel } from '../../models/index.model';

@Component({
  selector: 'dashboard-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnChanges {

  @Input()
  public projects: IProject[] = [];
  public pingCount: [];

  ngOnChanges(): void {
    this.projects = this.projects.map((project: IProject) => new ProjectModel(project));
  }
}
