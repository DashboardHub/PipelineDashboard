// Core modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


// Dashboard hub model and services
import { ProjectService, UserService } from '@core/services/index.service';
import { ProjectModel, UserStatsModel } from '@shared/models/index.model';

/**
 * Homepage component
 */
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
  public activeuserTable: string[] = ['avatar', 'title', 'description'];
  public projectTable: string[] = ['icon', 'title', 'description'];

  /**
   * Life cycle method
   * @param projectService ProjectService instance
   * @param userService UserService instance
   * @param breakpointObserver BreakpointObserver instance
   */
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) { }

  /**
   * Life cycle init method. Initialization of all parameteres
   */
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
          this.activeuserTable = ['avatar', 'title'];
          this.projectTable = ['icon', 'title', 'shortDescription'];
          this.isSmallScreen = true;
        } else {
          this.activeuserTable = ['avatar', 'title', 'description'];
          this.projectTable = ['icon', 'title', 'description'];
          this.isSmallScreen = false;
        }
      });
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

  /**
   * Method to return the project type
   * @param project project instance
   */
  public checkTypeOfProject(project: ProjectModel): string {
    if (project.type === 'private') {
      return 'private_icon';
    } else if (project.type === 'public') {
      return 'public_icon';
    }
  }
}
