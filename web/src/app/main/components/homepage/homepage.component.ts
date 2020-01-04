// Core modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// Dashboard hub model and services
import { IProject, ProjectModel, StatsModel, UserStatsModel } from '@shared/models/index.model';

/**
 * Homepage component
 */
@Component({
  selector: 'dashboard-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  public projects: IProject[] = [];
  public popularProjects: IProject[] = [];
  public users: UserStatsModel[] = [];
  public title: string = 'Public Projects';
  public isSmallScreen: boolean;
  public activeuserTable: string[] = ['avatar', 'title', 'description'];
  public projectTable: string[] = ['icon', 'title', 'description'];
  public applicationStats: StatsModel;

  /**
   * Life cycle method
   * @param route ActivatedRoute
   * @param breakpointObserver BreakpointObserver
   */
  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) { }

  /**
   * Life cycle init method. Initialization of all parameteres
   */
  ngOnInit(): void {
    this.route.data.subscribe((data: {
      projects: ProjectModel[],
      popularProjects: ProjectModel[],
      userStats: UserStatsModel[],
      applicationStats: StatsModel
    }) => {
      this.projects = data.projects;
      this.popularProjects = data.popularProjects;
      this.users = data.userStats;
      this.applicationStats = data.applicationStats;
    });
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
   * Returns the project type if private or public
   * @param project project
   */
  public checkTypeOfProject(project: ProjectModel): string {
    return project.isPrivate() ? 'lock' : 'lock_open';
  }
}
