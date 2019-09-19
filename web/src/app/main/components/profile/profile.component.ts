// Core modules
import { Component, OnDestroy, OnInit } from '@angular/core';

// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// Rxjs operators
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { AuthenticationService } from '@core/services/index.service';
import { LoginAuditModel, ProfileModel } from '@shared/models/index.model';

/**
 * Profile component
 */
@Component({
  selector: 'dashboard-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  private loginsSubscription: Subscription;
  public profile: ProfileModel;
  public logins: LoginAuditModel[] = [];
  public isSmallScreen: boolean;
  displayedColumns: string[] = ['title', 'description'];

  /**
   * Life cycle method
   * @param authService AuthenticationService instance
   * @param breakpointObserver BreakpointObserver instance
   */
  constructor(
    public authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.profile = this.authService.profile;
    this.loginsSubscription = this.authService
      .getLogins()
      .subscribe((logins: LoginAuditModel[]) => this.logins = logins);
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayedColumns = ['title'];
          this.isSmallScreen = true;
        } else {
          this.displayedColumns = ['title', 'description'];
          this.isSmallScreen = false;
        }
      });
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.loginsSubscription
      .unsubscribe();
  }
}
