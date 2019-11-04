// Core modules
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { Router } from '@angular/router';
import { ProjectService } from '@core/services/index.service';
import { IProject, ProjectModel } from '../../models/index.model';

/**
 * Private public project component
 */
@Component({
  selector: 'dashboard-projects-private-public',
  templateUrl: './private-public-project.component.html',
  styleUrls: ['./private-public-project.component.scss'],
})
export class PrivatePublicProjectComponent implements OnInit, OnDestroy {

  private projectSubscription: Subscription;
  public projects: ProjectModel[] = [];
  public showTitle: boolean;
  @Input() title: string = 'My Projects';

  /**
   * Life cycle method
   * @param projectService ProjectService
   * @param router Router
   */
  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {
  }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    if (this.router.url === '/') {
      this.projectSubscription = this.projectService
        .findPublicProjects()
        .subscribe((projects: IProject[]) => this.projects = projects.map((project: IProject) => new ProjectModel(project))
          .filter((project: ProjectModel) => project.repositories.length > 1));
    } else {
      this.showTitle = true;
      this.projectSubscription = this.projectService
        .findMyProjects()
        .subscribe((projects: IProject[]) => this.projects = projects.map((project: IProject) => new ProjectModel(project)));
    }
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.projectSubscription
      .unsubscribe();
  }
}
