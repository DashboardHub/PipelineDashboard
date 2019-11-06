// Core modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// DashboardHub services
import { PullRequestStatusModel } from '@app/shared/models/index.model';

@Component({
  selector: 'dashboard-build-history',
  templateUrl: './build-history.component.html',
  styleUrls: ['./build-history.component.scss'],
})
export class BuildHistoryComponent implements OnInit {

  public projectUid: string;
  public repoUid: string;
  public pullRequestUid: string;
  public historic: [];
  public displayedColumns: string[] = ['commitId', 'time', 'createdAt'];
  public status: PullRequestStatusModel;

  /**
   * Life cycle method
   * @param route ActivateRoute
   */
  constructor(
    private route: ActivatedRoute
  ) { }

  /**
   * Captured pull request status information from status resolver route
   */
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.repoUid = this.route.snapshot.paramMap.get('repoUid');
    this.route.data.subscribe((data: { status: PullRequestStatusModel }) => this.status = data.status);
  }
}
