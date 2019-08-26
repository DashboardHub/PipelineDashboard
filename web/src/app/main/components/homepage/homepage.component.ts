import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { ProjectService, UserService } from '../../../core/services/index.service';
import { ProjectModel, UserStatsModel } from '../../../shared/models/index.model';

@Component({
  selector: 'dashboard-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  private projectSubscription: Subscription;
  public projects: ProjectModel[] = [];
  public users: UserStatsModel[] = [];
  public title: string = 'Public Projects';

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.userService
      .findAllUserStats()
      .subscribe((users: UserStatsModel[]) => this.users = users);
    this.projectSubscription = this.projectService
      .getPopularProjects()
      .subscribe((projects: ProjectModel[]) => this.projects = projects);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }
}
