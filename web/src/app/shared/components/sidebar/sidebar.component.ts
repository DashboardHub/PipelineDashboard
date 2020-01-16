// Core modules
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// Rxjs modules
import { MatSidenav } from '@angular/material';
import { delay } from 'rxjs/operators';

// DashboardHub models and services
import { ActivityService, AuthenticationService } from '@core/services/index.service';
import { Navigation, ProfileModel } from '@shared/models/index.model';
import { environment } from 'src/environments/environment';

/**
 * Sidebar component
 */
@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public progress: number = 0;
  public publicRoutes: Navigation[] = [
    {
      title: 'Homepage',
      route: '/',
      icon: 'home',
    },
  ];
  public privateRoutes: Navigation[] = [
    {
      title: 'My Projects',
      route: '/projects',
      icon: 'dashboard',
    },
    {
      title: 'Add Project',
      route: '/projects/create',
      icon: 'add_to_photos',
    },
    {
      title: 'Profile',
      route: '/profile',
      icon: 'person',
    },
  ];
  public generalRoutes: Navigation[] = [
    {
      title: 'Features',
      route: '/features',
      icon: 'poll',
    },
    {
      title: 'Help',
      route: '/help',
      icon: 'help_outline',
    },
    // {
    //   title: 'Terms & Conditions',
    //   route: '/terms-and-conditions',
    //   icon: 'terms_page_icon',
    // },
    // {
    //   title: 'Privacy',
    //   route: '/privacy',
    //   icon: 'privacy_page_icon',
    // },
  ];
  public adminRoutes: Navigation[] = [
    {
      title: 'List users',
      route: '/admin/users',
      icon: 'person',
    },
  ];
  public version: string;
  public isSmallScreen: boolean;
  public menuTriger: boolean;
  public sideNavMode: string;
  @ViewChild('sidenav') public menu: MatSidenav;

  /**
   * Life cycle method
   * @param authService AuthenticationService
   * @param activityService ActivityService
   * @param breakpointObserver BreakpointObserver
   */
  constructor(
    private authService: AuthenticationService,
    private activityService: ActivityService,
    private breakpointObserver: BreakpointObserver
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.menuTriger = true;
          this.isSmallScreen = true;
          this.sideNavMode = 'over';
        } else {
          this.isSmallScreen = false;
          this.sideNavMode = 'side';
        }
      });

    this.version = environment.version;
  }

  /**
   * Life cycle after view init method
   */
  ngAfterViewInit(): void {
    this.activityService
      .getProgressBar()
      .pipe(delay(0))
      .subscribe((progress: number) => this.progress = progress);
  }

  /**
   * Return the profile
   */
  public getProfile(): ProfileModel {
    return this.authService.profile;
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  /**
   * Login in the system
   */
  public login(): void {
    this.authService.login();
  }

  /**
   * Logout from the system
   */
  public logout(): void {
    this.authService.logout();
  }

  /**
   * Close the menu
   */
  public closeMenu(): void {
    if (this.isSmallScreen) {
      this.menu.opened = false;
    }
  }

  /**
   * Open menu
   * @param event Event
   */
  public openMenu(event: Event): void {
    event.stopPropagation();
    if (!this.isSmallScreen) {
      this.menuTriger = !this.menuTriger;
    }
  }

  /**
   * Show door bell
   */
  public showDoorbell(): void {
    (<any>window).doorbell.show();
  }
}
