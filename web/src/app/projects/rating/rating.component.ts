// Core components
import { Component, OnDestroy, OnInit } from '@angular/core';

// Application services/model
import { ActivatedRoute } from '@angular/router';
import { BreadCrumbModel, ProjectModel, RepositoryModel } from '@app/shared/models/index.model';
import { RepositoryService } from '@core/services/index.service';
import { Subscription } from 'rxjs';

/**
 * Repository rating component
 */
@Component({
  selector: 'dashboard-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnDestroy {

  private repositorySubscription: Subscription;

  public project: ProjectModel;
  public repository: RepositoryModel;
  public breadCrumb: BreadCrumbModel[];

  /**
   * Life cycle method
   * @param repositoryService Repository service
   * @param route ActivatedRoute
   */
  constructor(
    private repositoryService: RepositoryService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data: { repository: RepositoryModel, project: ProjectModel }) => {
      this.repository = data.repository;
      this.project = data.project;
      this.breadCrumb = [{ link: `/projects/${this.project.uid}`, title: this.project.title }];
    });
  }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    const repoUid: string = this.route.snapshot.paramMap.get('repoUid');

    this.repositorySubscription = this.repositoryService
      .findOneById(repoUid)
      .subscribe((repository: RepositoryModel) => this.repository = repository);
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.repositorySubscription.unsubscribe();
  }
}
