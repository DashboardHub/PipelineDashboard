// Core modules
import { Component, Input, OnInit } from '@angular/core';

// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// DashboardHub Models
import { AuthenticationService } from '@core/services/index.service';
import { BreadCrumbModel, ProjectModel } from '@shared/models/index.model';

/**
 * Breadcrumb component
 */
@Component({
  selector: 'dashboard-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {

  public typeIcon: string;
  public isSmallScreen: Boolean;

  @Input() project: ProjectModel;
  @Input() subTitle: string;
  @Input() breadCrumb: BreadCrumbModel[];

  /**
   * Life cycle method
   * @param breakpointObserver BreakpointObserver
   * @param authService AuthenticationService
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.typeIcon = this.project.isPrivate() ? 'lock' : 'lock_open';
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isSmallScreen = true;
        } else {
          this.isSmallScreen = false;
        }
      });
  }

  /**
   * Check if logged in user is also owner of the project
   */
  public isAdmin(): boolean {
    return this.project.isAdmin(this.authService.profile.uid);
  }

}
