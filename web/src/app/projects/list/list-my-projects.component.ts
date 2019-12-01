// Core components
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Application services/model
import { ProjectService } from '@core/services/index.service';
import { IProject } from '@shared/models/index.model';

/**
 * List my project component
 */
@Component({
  selector: 'dashboard-list-my-projects',
  templateUrl: './list-my-projects.component.html',
})
export class ListMyProjectsComponent implements OnInit, OnDestroy {

  private projectSubscription: Subscription;

  public projects: IProject[] = [];

  /**
   * Life cycle method
   * @param projectService Project service
   */
  constructor(
    private projectService: ProjectService
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.projectSubscription = this.projectService
      .findMyProjects()
      .subscribe((projects: IProject[]) => this.projects = projects);
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }
}
