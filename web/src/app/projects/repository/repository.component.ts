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
  public isAlertEnabled: Boolean = false;
  public rating: number;

  @Input()
  public uid: string;

  public manualReload: boolean = false;
  public repository: RepositoryModel = new RepositoryModel('');

  constructor(
    private repositoryService: RepositoryService,
    private sortingService: SortingService
  ) {
  }

  ngOnInit(): void {
    this.showWebHookAlert();
    this.repositorySubscription = this.repositoryService
      .findOneById(this.uid)
      .subscribe((repository: RepositoryModel) => {
        this.repository = repository;
        this.getRepoRating();
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
      });
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

  public reloadRepository(repositoryName: string): void {
    this.manualReload = true;
    this.repositoryService.loadRepository(repositoryName)
      .subscribe(() => setTimeout(() => this.manualReload = false, 60000)); // disable the ping button for 60 seconds;
  }

  getRepoRating(): void {
    this.rating = this.repositoryService.getRepoRating(this.repository);
  }

  private showWebHookAlert(): void {
    setTimeout(() => this.isAlertEnabled = true, 10000);
  }
}
