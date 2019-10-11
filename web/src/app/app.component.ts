// Core modules
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { delay } from 'rxjs/operators';

// Dashboard hub Icon register
import { MatSidenav } from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';

import { DomSanitizer } from '@angular/platform-browser';

// Dashboard hub models and services
import { ActivityService, AuthenticationService } from './core/services/index.service';
import { Navigation, ProfileModel } from './shared/models/index.model';

import { environment } from './../environments/environment';

/**
 * App component
 */
@Component({
  selector: 'dashboard-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {

  private ga: Function = (<any>window).ga;
  public progress: number = 0;
  public publicRoutes: Navigation[] = [
    {
      title: 'Homepage',
      route: '/',
      icon: 'home_page_2_icon',
    },
  ];
  public privateRoutes: Navigation[] = [
    {
      title: 'My Projects',
      route: '/projects',
      icon: 'project_page_icon',
    },
    {
      title: 'Add Project',
      route: '/projects/create',
      icon: 'add_project_page_icon',
    },
    {
      title: 'Profile',
      route: '/profile',
      icon: 'profile_page_icon',
    },
  ];
  public generalRoutes: Navigation[] = [
    {
      title: 'Features',
      route: '/features',
      icon: 'feature_page_icon',
    },
    {
      title: 'Help',
      route: '/help',
      icon: 'help_page_icon',
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
      icon: 'stats_user_icon',
    },
  ];
  public version: string;
  public isSmallScreen: boolean;
  public menuTriger: boolean;
  public sideNavMode: string;
  @ViewChild('sidenav') public menu: MatSidenav;

  /**
   * Life cycle method
   * @param _iconRegistry MatIconRegistry
   * @param _domSanitizer DomSanitizer
   * @param authService AuthenticationService
   * @param activityService ActivityService
   * @param breakpointObserver BreakpointObserver
   */
  constructor(
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private authService: AuthenticationService,
    private activityService: ActivityService,
    private breakpointObserver: BreakpointObserver,
    private router: Router

  ) {
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

    this._iconRegistry.addSvgIcon(
      'contributor_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-account_circle-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'release_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-extension-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'repository_folder',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-folder_open-24px-1.svg')
    );
    this._iconRegistry.addSvgIcon(
      'event',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-event_available-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'private_toolbar_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/toolbar-private.svg')
    );
    this._iconRegistry.addSvgIcon(
      'feedback_toolbar_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/toolbar-feedback.svg')
    );
    this._iconRegistry.addSvgIcon(
      'terms_toolbar_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/toolbar-description.svg')
    );
    this._iconRegistry.addSvgIcon(
      'tune_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-tune-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'create_project_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-add_to_photos-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'home_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-account_white_circle-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'refresh_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/refresh.svg')
    );
    this._iconRegistry.addSvgIcon(
      'project_list_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-dashboard-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'time_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-update-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'tune_white_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-white-tune-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'latest_pr_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/group-5.svg')
    );
    this._iconRegistry.addSvgIcon(
      'milestone_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-filter_none-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'monitor_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-desktop_windows-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'token_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-toll-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'token_white_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-toll-white-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'ping_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-swap_vertical_circle-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'ping_white_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-swap_vertical_white_circle-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'edit_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-edit-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'quickstart_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-flag-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'glosary_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-description-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'enviroment_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-vertical_split-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'how_becon_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-settings-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'create_enviroment_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-touch_app-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'edit_enviroment_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-edit-grey-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'delete_enviroment_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-delete_forever-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'badges_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-work_outline-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'warning_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/warning.svg')
    );
    this._iconRegistry.addSvgIcon(
      'badges_2_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/badges.svg')
    );
    this._iconRegistry.addSvgIcon(
      'export_data_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/export_data.svg')
    );
    this._iconRegistry.addSvgIcon(
      'followers_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/folowers.svg')
    );
    this._iconRegistry.addSvgIcon(
      'graphs_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/graphs.svg')
    );
    this._iconRegistry.addSvgIcon(
      'home_page_2_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/home-page.svg')
    );
    this._iconRegistry.addSvgIcon(
      'project_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/project-page.svg')
    );
    this._iconRegistry.addSvgIcon(
      'add_project_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/create-project-page.svg')
    );
    this._iconRegistry.addSvgIcon(
      'profile_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile-page.svg')
    );
    this._iconRegistry.addSvgIcon(
      'feature_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/features-page.svg')
    );
    this._iconRegistry.addSvgIcon(
      'help_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/help-page.svg')
    );
    this._iconRegistry.addSvgIcon(
      'terms_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/terms_grey.svg')
    );
    this._iconRegistry.addSvgIcon(
      'privacy_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/privacy-page.svg')
    );
    this._iconRegistry.addSvgIcon(
      'login_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/login.svg')
    );
    this._iconRegistry.addSvgIcon(
      'logout_page_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg')
    );
    this._iconRegistry.addSvgIcon(
      'github_login_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github_login.svg')
    );
    this._iconRegistry.addSvgIcon(
      'managment_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/managment.svg')
    );
    this._iconRegistry.addSvgIcon(
      'logo_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Logo.svg')
    );
    this._iconRegistry.addSvgIcon(
      'monitor_enviroments_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/monitor_enviroments.svg')
    );
    this._iconRegistry.addSvgIcon(
      'feature_check_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-done-green-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'private_enviroment_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/private_enviroment.svg')
    );
    this._iconRegistry.addSvgIcon(
      'public_unviroment_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/public_unviroment.svg')
    );
    this._iconRegistry.addSvgIcon(
      'sheduled_releases_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sheduled_releases.svg')
    );
    this._iconRegistry.addSvgIcon(
      'unlim_notification_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/unlim_notification.svg')
    );
    this._iconRegistry.addSvgIcon(
      'unlim_releases_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/unlim_releases.svg')
    );
    this._iconRegistry.addSvgIcon(
      'webhook_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/webhook.svg')
    );
    this._iconRegistry.addSvgIcon(
      'enterprise_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/enterprise.svg')
    );
    this._iconRegistry.addSvgIcon(
      'professional_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/professional.svg')
    );
    this._iconRegistry.addSvgIcon(
      'starter_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/starter.svg')
    );
    this._iconRegistry.addSvgIcon(
      'monitor_white_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/monitor-list.svg')
    );
    this._iconRegistry.addSvgIcon(
      'using_badges_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-markunread_mailbox-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'how_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-contact_support-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'why_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-code-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'communication_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-chat-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'delete_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-delete-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'hide_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/hide.svg')
    );
    this._iconRegistry.addSvgIcon(
      'public_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-lock_open-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'private_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-lock-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'privacy_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-lock-white-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'terms_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/terms.svg')
    );
    this._iconRegistry.addSvgIcon(
      'overwiew_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg')
    );
    this._iconRegistry.addSvgIcon(
      'security_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-security-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'check_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-check_circle-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'repository_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-folder_open-24px.svg')
    );
    this._iconRegistry.addSvgIcon(
      'request_white',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/request_white.svg')
    );
    this._iconRegistry.addSvgIcon(
      'triangle',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/triangle.svg')
    );
    this._iconRegistry.addSvgIcon(
      'header_github_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-header.svg')
    );
    this._iconRegistry.addSvgIcon(
      'header_login_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/login-header.svg')
    );
    this._iconRegistry.addSvgIcon(
      'header_person_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/non-auth-header.svg')
    );
    this._iconRegistry.addSvgIcon(
      'stats_header_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stats_header.svg')
    );
    this._iconRegistry.addSvgIcon(
      'stats_event_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stats_events.svg')
    );
    this._iconRegistry.addSvgIcon(
      'stats_project_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/objects_icon.svg')
    );
    this._iconRegistry.addSvgIcon(
      'stats_user_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stats_user.svg')
    );
    this._iconRegistry.addSvgIcon(
      'header_notificarion_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/notification-header.svg')
    );
    this._iconRegistry.addSvgIcon(
      'follow_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-follow.svg')
    );
    this._iconRegistry.addSvgIcon(
      'unfollow_icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-unfollow.svg')
    );
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'dashboardhub',
        this._domSanitizer
          .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/logo/logo-horizontal-std.svg')
      );
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'dashboardhub_white',
        this._domSanitizer
          .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/logo/logo-horizontal-white.svg')
      );
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'dashboardhub_icon',
        this._domSanitizer
          .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/logo/icon-only-orange.svg')
      );
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'github',
        this._domSanitizer
          .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/logo/github.svg')
      );
    this.version = environment.version;
  }

  /**
   * Initializing the google analytics router events
   */
  public ngOnInit(): void {
    this.ga('create', environment.tracking , 'auto');
    this.ga('send', 'pageview');

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        this.ga('set', 'page', event.urlAfterRedirects);
        this.ga('send', 'pageview');
      }
    });
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
