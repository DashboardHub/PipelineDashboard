// Core components
import { Component, OnDestroy, OnInit } from '@angular/core';

// Application services/model
import { ActivatedRoute } from '@angular/router';
import { RatingModel, RepositoryModel } from '@app/shared/models/index.model';
import { RepositoryService } from '@core/services/index.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Repository rating component
 */
@Component({
  selector: 'dashboard-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnDestroy {

  private repoUid: string;
  private repositorySubscription: Subscription;

  public projectUid: string;
  public repository: RepositoryModel = new RepositoryModel('');
  public repoRatings: RatingModel[];

  /**
   * Life cycle method
   * @param repositoryService instance of Repository service
   */
  constructor(
    private repositoryService: RepositoryService,
    private route: ActivatedRoute
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.repoUid = this.route.snapshot.paramMap.get('repoUid');
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');

    this.repositorySubscription = this.repositoryService
      .findOneById(this.repoUid)
      .pipe(
        map((repository: RepositoryModel) => this.repository = repository)
      )
      .subscribe(() => this.repoRatings = this.repositoryService.getRating(this.repository));
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.repositorySubscription.unsubscribe();
  }
}
