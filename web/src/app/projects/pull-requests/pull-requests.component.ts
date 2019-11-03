// Core modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Dashboard Hub application services and models
import { RepositoryService } from '@core/services/index.service';
import { PullRequestModel, PullRequestStatusModel, RepositoryModel } from '@shared/models/index.model';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'dashboard-pull-requests',
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.scss'],
})
export class PullRequestsComponent implements OnInit {

  public statuses: PullRequestStatusModel[];
  public repository: RepositoryModel;
  public projectUid: string;
  public displayedColumns: string[] = ['id', 'title', 'buildCount', 'time', 'state', 'commits', 'comments', 'reviewComments', 'changedFiles'];

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService
  ) { }

  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    const repoUid: string = this.route.snapshot.paramMap.get('repoUid');
    this.route.data.pipe(
      take(1),
      switchMap((data: { repository: RepositoryModel }) => {
        this.repository  = data.repository;

        return this.repositoryService.getPullRequestStatuses(repoUid);
      }))
      .subscribe((statuses: PullRequestStatusModel[]) => {
        this.statuses = statuses;
        this.repository.pullRequests.map((pullRequest: PullRequestModel) => {
          pullRequest.statuses = this.statuses.filter((status: PullRequestStatusModel) => status.id.toString() === pullRequest.uid.toString())[0];
        });
      });
  }

}
