// Core components
import { Component, OnInit } from '@angular/core';

// Application services/model
import { ActivatedRoute } from '@angular/router';
import { IProject, ProjectModel } from '@shared/models/index.model';

/**
 * List my project component
 */
@Component({
  selector: 'dashboard-list-my-projects',
  templateUrl: './list-my-projects.component.html',
})
export class ListMyProjectsComponent implements OnInit {

  public projects: IProject[] = [];
  public title: string = 'My Projects';

  /**
   * Life cycle method
   * @param projectService Project service
   */
  constructor(
    private route: ActivatedRoute
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.route.data.subscribe((data: { projects: ProjectModel[] }) => this.projects = data.projects);
  }
}
