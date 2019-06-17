import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { RepositoryService } from '../../core/services/index.service';
import { MilestoneModel, RepositoryModel } from '../../shared/models/index.model';

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
    private repositoryService: RepositoryService
  ) {
  }

  ngOnInit(): void {
    this.repositorySubscription = this.repositoryService
      .findOneById(this.uid)
      .subscribe((repository: RepositoryModel) => {
        this.repository = repository;
        this.sortMilestones();
      });
  }

  ngDestroy(): void {
    this.repositorySubscription
      .unsubscribe();
  }

  /**
   * This function is used for sorting the milestones by updatedAt
   */
  sortMilestones(): void {
    this.repository.milestones.sort((m1: MilestoneModel, m2: MilestoneModel) => {
      const date1: Date = new Date(m1.updatedAt);
      const date2: Date = new Date(m2.updatedAt);
      return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
    });
  }
}
