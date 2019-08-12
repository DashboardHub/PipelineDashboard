// Core components
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

// Dashboard hub model
import { ProjectModel } from '../../models/index.model';

/**
 * Project list component
 */
@Component({
  selector: 'dashboard-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnChanges {

  @Input()
  public projects: ProjectModel[] = [];
  public pingCount: [];

  /**
   * Life cycle on change event to detect change in input property
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.projects = changes.projects.currentValue;
  }
}
