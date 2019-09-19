
// Core components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material';

// Dashboard hub model
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ProjectService } from '@core/services/index.service';
import { ProjectModel } from '../../models/index.model';

/**
 * Project list component
 */
@Component({
  selector: 'dashboard-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnChanges {

  @Input()
  public projects: ProjectModel[] = [];

  public displayedColumns: string[];

  public pingCount: [];

  public isSmallScreen: boolean;

  /**
   * Life cycle method
   * @param breakpointObserver BreakpointObserver instance
   * @param authService AuthenticationService instance
   * @param projectService ProjectService instance
   * @param snackBar MatSnackBar instance
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Medium])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isSmallScreen = false;
          this.displayedColumns = ['type', 'title', 'url', 'repository', 'monitors', 'pings', 'user', 'lastDate'];
        } else {
          this.isSmallScreen = false;
          this.displayedColumns = ['type', 'title', 'description', 'url', 'repository', 'monitors', 'pings', 'user', 'lastDate'];
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayedColumns = ['type', 'title', 'url', 'repository', 'monitors', 'pings'];
          this.isSmallScreen = false;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayedColumns = ['title', 'repository'];
          this.isSmallScreen = true;
        }
      });
  }

  /**
   * Method to check if project belongs to owner or not
   * @param project ProjectModel instance
   */
  isAdmin(project: ProjectModel): boolean {
    return project.isAdmin(this.authService.profile.uid);
  }

  /**
   * Life cycle on change event to detect change in input property
   */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.projects) {
      this.projects = changes.projects.currentValue;
    }
  }

  /**
   * Method to check project type
   * @param project ProjectModel instance
   */
  public checkTypeOfProject(project: ProjectModel): string {
    if (project.type === 'private') {
      return 'private_icon';
    } else if (project.type === 'public') {
      return 'public_icon';
    }
  }

  /**
   * Method to delete project
   * @param projectUid uid of project
   */
  public delete(projectUid: string): void {
    this.projectService
      .showDeleteDialog(projectUid)
      .subscribe(() => this.snackBar.open('Project deleted successfully', undefined, { duration: 5000 }));
  }
}
