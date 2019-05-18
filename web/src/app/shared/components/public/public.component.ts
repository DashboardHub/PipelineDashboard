import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/index.service';
import { ProjectModel } from '../../models/index.model';

@Component({
  selector: 'dashboard-projects-public',
  templateUrl: './public.component.html',
})
export class PublicProjectsComponent implements OnInit {

  private projectSubscription: Subscription;
  public projects: ProjectModel[] = [];
  @Input() title: string = 'My Projects';

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.projectSubscription = this.projectService
        .findPublicProjects()
        .subscribe((projects: ProjectModel[]) => this.projects = projects);
    } else {
      this.projectSubscription = this.projectService
        .findMyProjects()
        .subscribe((projects: ProjectModel[]) => this.projects = projects);
    }
  }

  ngDestroy(): void {
    this.projectSubscription
      .unsubscribe();
  }
}
