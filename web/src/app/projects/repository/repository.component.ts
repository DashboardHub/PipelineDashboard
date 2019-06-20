import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { RepositoryService, SortingService } from '../../core/services/index.service';
import { RepositoryModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {

  private repositorySubscription: Subscription;

  @Input()
  public uid: string;

  public repository: RepositoryModel = new RepositoryModel('');

  constructor(
    private repositoryService: RepositoryService,
    private sortingService: SortingService
  ) {
  }

  ngOnInit(): void {
    this.repositorySubscription = this.repositoryService
      .findOneById(this.uid)
      .subscribe((repository: RepositoryModel) => {
        this.repository = repository;
        if (this.repository.milestones) {
          this.sortingService.sortListByDate(this.repository.milestones, 'updatedAt');
        }
        if (this.repository.releases) {
          this.sortingService.sortListByDate(this.repository.releases, 'createdAt');
        }
        if (this.repository.contributors) {
          this.sortingService.sortListByNumber(this.repository.contributors, 'total');
        }
        if (this.repository.pullRequests) {
          this.sortingService.sortListByDate(this.repository.pullRequests, 'createdOn');
        }
      });
  }

  ngDestroy(): void {
    this.repositorySubscription
      .unsubscribe();
  }
}
