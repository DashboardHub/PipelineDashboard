import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/index.service';
import { IProject } from '../../models/index.model';

@Component({
  selector: 'dashboard-projects-private-public',
  templateUrl: './private-public-project.component.html',
})
export class PrivatePublicProjectComponent implements OnInit, OnDestroy {

  private projectSubscription: Subscription;
  public projects: IProject[] = [];
  @Input() title: string = 'My Projects';

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.projectSubscription = this.projectService
        .findPublicProjects()
        .subscribe((projects: IProject[]) => this.projects = projects);
    } else {
      this.projectSubscription = this.projectService
        .findMyProjects()
        .subscribe((projects: IProject[]) => this.projects = projects);
    }
  }

  ngOnDestroy(): void {
    this.projectSubscription
      .unsubscribe();
  }
}
