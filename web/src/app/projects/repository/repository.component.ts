import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

// Dashboard hub model and services
import { RepositoryService, SortingService } from '@core/services/index.service';
import { ContributorModel, MilestoneModel, PullRequestModel, ReleaseModel, RepositoryModel } from '@shared/models/index.model';

@Component({
  selector: 'dashboard-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit, OnDestroy {

  private repositorySubscription: Subscription;
  public headerHeight: number;
  public isLargeScreen: boolean;

  @Input()
  public uid: string;

  public repository: RepositoryModel = new RepositoryModel('');
  public numberOfDisplayedUsers: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private repositoryService: RepositoryService,
    private sortingService: SortingService
  ) {
    if (breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.headerHeight = 60;
    } else {
      this.headerHeight = 200;
    }
  }

  ngOnInit(): void {
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
        if (this.headerHeight === 75) {
          if (this.repository.fullName.length > 24) {
            this.headerHeight += 10;
          }
          if (this.repository.description) {
            this.headerHeight += 30;
          }
          if (this.repository.contributors && this.repository.contributors.length > 0) {
            this.headerHeight += 40;
          } else {
            this.headerHeight += 20;
          }
          this.numberOfDisplayedUsers = 4;
        }
        if (this.headerHeight === 50) {
          this.headerHeight = 100;
          if (this.isLargeScreen) {
            this.headerHeight = 200;
            this.isLargeScreen = false;
          }
          this.numberOfDisplayedUsers = 8;
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
          this.headerHeight = 200;
          this.isLargeScreen = true;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.headerHeight = 70;
          this.numberOfDisplayedUsers = 4;
          if (this.repository.description && this.repository.description.length > 50) {
            this.headerHeight += 30;
          }
          if (this.repository.contributors && this.repository.contributors.length > 0) {
            this.headerHeight += 35;
          }
        } else {
          this.headerHeight = 50;
          if (this.repository.contributors && this.repository.contributors.length > 0) {
            this.headerHeight += 150;
          }
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.headerHeight = 75;
          this.numberOfDisplayedUsers = 4;
          if (this.repository.description && this.repository.description.length > 50) {
            this.headerHeight += 30;
          }
          if (this.repository.contributors && this.repository.contributors.length > 0) {
            this.headerHeight += 30;
          }
        } else {
          this.headerHeight = 50;
          if (this.repository.contributors && this.repository.contributors.length > 0) {
            this.headerHeight += 60;
          }
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
}
