import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

// Dashboard hub model and services
import { RepositoryService, SortingService } from '@core/services/index.service';
import { ContributorModel, MilestoneModel, PullRequestModel, RatingModel, ReleaseModel, RepositoryModel } from '@shared/models/index.model';

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
  public rating: number;

  @Input()
  public isAdmin: boolean = false;

  @Input()
  public uid: string;

  public manualReload: boolean = false;
  public repository: RepositoryModel = new RepositoryModel('');
  public numberOfDisplayedUsers: number;

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

  ngOnInit(): void {
    this.showWebHookAlert();
    this.repositorySubscription = this.repositoryService
      .findOneById(this.uid)
      .subscribe((repository: RepositoryModel) => {
        this.repository = repository;
        this.calculateRating();
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
          this.isLargeScreen = false;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.numberOfDisplayedUsers = 4;
          this.headerHeight = 100;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.headerHeight = 100;
          this.numberOfDisplayedUsers = 4;
        }
      });
  }

  getMoreInformation(contributor: ContributorModel): string {
    return `${contributor.owner.username}` + ' \n ' + ` Total commits : ${contributor.total}`;
  }

  ngOnDestroy(): void {
    this.repositorySubscription
      .unsubscribe();
  }

  public createWebhook(): void {
    this.repositoryService.createGitWebhook(this.repository)
      .pipe(take(1))
      .subscribe();
  }

  public reloadRepository(repository: RepositoryModel, event: Event): void {
    event.stopPropagation();
    this.manualReload = true;
    this.repositoryService.loadRepository(repository)
      .subscribe(() => setTimeout(() => this.manualReload = false, 60000)); // disable the ping button for 60 seconds;
  }

  public calculateRating(): void {
    const repoRatings: RatingModel[] = this.repositoryService.getRating(this.repository);
    const ratingValues: number[] = repoRatings.map((rating: RatingModel) => rating.value);
    this.rating = ratingValues.reduce((total: number, current: number) => total + current, 0) / repoRatings.length;
  }

  private showWebHookAlert(): void {
    setTimeout(() => this.isAlertEnabled = true, 10000);
  }
}
