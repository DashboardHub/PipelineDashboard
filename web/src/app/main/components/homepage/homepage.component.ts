// Core modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// Dashboard hub model and services
import { ProjectService, UserService } from '@core/services/index.service';
import { IProject, ProjectModel, UserStatsModel } from '@shared/models/index.model';

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
  public projects: IProject[] = [];
  public popularProjects: IProject[] = [];
  public users: UserStatsModel[] = [];
  public title: string = 'Public Projects';
  public isSmallScreen: boolean;
  public activeuserTable: string[] = ['avatar', 'title', 'description'];
  public projectTable: string[] = ['icon', 'title', 'description'];

  /**
   * Life cycle method
   * @param projectService ProjectService
   * @param userService UserService
   * @param breakpointObserver BreakpointObserver
   */
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) { }

  /**
   * Life cycle init method. Initialization of all parameteres
   */
  ngOnInit(): void {
    this.projects = this.route.snapshot.data.projects;
    this.userSubscription = this.userService
      .findAllUserStats()
      .subscribe((users: UserStatsModel[]) => this.users = users);
    this.projectSubscription = this.projectService
      .getPopularProjects()
      .subscribe((popularProjects: IProject[]) => this.popularProjects = popularProjects);
    this.projectService
      .findPublicProjects()
      .subscribe((projects: IProject[]) => this.projects = projects);
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
   * Returns the project type if private or public
   * @param project project
   */
  public checkTypeOfProject(project: ProjectModel): string {
    if (project.type === 'private') {
      return 'lock';
    } else if (project.type === 'public') {
      return 'lock_open';
    }
  }
}
