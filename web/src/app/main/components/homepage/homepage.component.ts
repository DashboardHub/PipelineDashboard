// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { ProjectService, UserService } from '@core/services/index.service';
import { ProjectModel, UserStatsModel } from '@shared/models/index.model';

@Component({
  selector: 'dashboard-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  private projectSubscription: Subscription;
  public projects: ProjectModel[] = [];
  public users: UserStatsModel[] = [];
  public title: string = 'Public Projects';
  public isSmallScreen: boolean;
  public displayedColumns: string[] = ['avatar', 'title', 'description'];
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.userService
      .findAllUserStats()
      .subscribe((users: UserStatsModel[]) => this.users = users);
    this.projectSubscription = this.projectService
      .getPopularProjects()
      .subscribe((projects: ProjectModel[]) => this.projects = projects);
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayedColumns = ['avatar', 'title'];
          this.isSmallScreen = true;
        } else {
          this.displayedColumns = ['avatar', 'title', 'description'];
          this.isSmallScreen = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }
}
