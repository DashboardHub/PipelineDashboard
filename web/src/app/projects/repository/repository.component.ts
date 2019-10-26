// Core modules
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

// RXjs operators
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { take } from 'rxjs/operators';

// Breakpoint resolvers
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// Dashboard hub model and services
import { RepositoryService, SortingService } from '@core/services/index.service';
import {
  ContributorModel, IRepository, MilestoneModel, PullRequestModel, PullRequestStatusModel, ReleaseModel,
  RepositoryModel
} from '@shared/models/index.model';

/**
 * Repository component
 */
@Component({
  selector: 'dashboard-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit, OnDestroy {

  private repositorySubscription: Subscription;
  public headerHeight: number;
  public isLargeScreen: boolean;
  public isAlertEnabled: boolean = false;

  @Input()
  public isAdmin: boolean = false;

  @Input()
  public uid: string;

  public manualReload: boolean = false;
  public repository: IRepository;
  public numberOfDisplayedUsers: number;

  /**
   * Life cycle method
   * @param breakpointObserver BreakpointObserver
   * @param repositoryService RepositoryService
   * @param sortingService SortingService
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private repositoryService: RepositoryService,
    private sortingService: SortingService
  ) {
    if (breakpointObserver.isMatched(Breakpoints.Large || Breakpoints.XLarge)) {
      this.isLargeScreen = true;
      this.headerHeight = 200;
    } else {
      this.isLargeScreen = false;
      this.headerHeight = 100;
    }
  }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.showWebHookAlert();
    this.repositorySubscription = this.repositoryService
      .findOneById(this.uid)
      .subscribe((repository: RepositoryModel) => {
        this.repository = repository;
        if (this.repository && this.repository.milestones.length > 0) {
          this.sortingService.sortListByDate<MilestoneModel>(this.repository.milestones, 'updatedAt');
        }
        if (this.repository && this.repository.releases.length > 0) {
          this.sortingService.sortListByDate<ReleaseModel>(this.repository.releases, 'createdAt');
        }
        if (this.repository && this.repository.contributors.length > 0) {
          this.sortingService.sortListByNumber<ContributorModel>(this.repository.contributors, 'total');
        }
        if (this.repository && this.repository.pullRequests.length > 0) {
          this.sortingService.sortListByDate<PullRequestModel>(this.repository.pullRequests, 'createdOn');
        }
        if (this.isLargeScreen) {
          this.headerHeight = 200;
        } else {
          this.headerHeight = 100;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Large])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.numberOfDisplayedUsers = 8;
          this.headerHeight = 200;
          this.isLargeScreen = true;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.XLarge])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.numberOfDisplayedUsers = 8;
          this.headerHeight = 200;
          this.isLargeScreen = true;
        }
      });

    this.breakpointObserver
      .observe([Breakpoints.Medium])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.headerHeight = 100;
          this.numberOfDisplayedUsers = 8;
          this.isLargeScreen = false;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.numberOfDisplayedUsers = 3;
          this.headerHeight = 100;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.headerHeight = 100;
          this.numberOfDisplayedUsers = 2;
        }
      });
  }

  /**
   * Find contributors details
   * @param contributor ContributorModel
   */
  getMoreInformation(contributor: ContributorModel): string {
    return `${contributor.owner.username}` + ' \n ' + ` Total commits : ${contributor.total}`;
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.repositorySubscription
      .unsubscribe();
  }

  /**
   * Create webhook
   */
  public createWebhook(): void {
    this.repositoryService.createGitWebhook(this.repository)
      .pipe(take(1))
      .subscribe();
  }

  /**
   * Reload repository when click on refresh button
   * @param repository RepositoryModel
   * @param event Event
   */
  public reloadRepository(repository: RepositoryModel, event: Event): void {
    event.stopPropagation();
    this.manualReload = true;
    this.repositoryService.loadRepository(repository)
      .subscribe(() => setTimeout(() => this.manualReload = false, 60000)); // disable the ping button for 60 seconds;
  }

  private showWebHookAlert(): void {
    setTimeout(() => this.isAlertEnabled = true, 10000);
  }
}
