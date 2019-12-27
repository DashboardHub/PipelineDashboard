
// Core modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Breakpoint resolvers
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// Dashboard hub models
import { PingService } from '@core/services/index.service';
import { BreadCrumbModel, PingModel, ProjectModel } from '@shared/models/index.model';

/**
 * Ping list components
 */
@Component({
  selector: 'dashboard-pings-list',
  templateUrl: './pings-list.component.html',
  styleUrls: ['./pings-list.component.scss'],
})
export class PingsListComponent implements OnInit, OnDestroy {

  private pingSubscription: Subscription;
  public pings: PingModel[] = [];
  public projectUid: string;
  public monitorUid: string;
  public displayedColumns: string[];
  public isSmallScreen: boolean;
  public breadCrumb: BreadCrumbModel[];
  public project: ProjectModel;

  /**
   * Life cycle method
   * @param route ActivatedRoute
   * @param pingService PingService
   * @param breakpointObserver BreakpointObserver
   */
  constructor(
    private route: ActivatedRoute,
    private pingService: PingService,
    private breakpointObserver: BreakpointObserver
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.monitorUid = this.route.snapshot.paramMap.get('monitorUid');
    this.route.data.subscribe((data: { pings: PingModel[], project: ProjectModel }) => {
      this.pings = data.pings;
      this.project = data.project;
      this.breadCrumb = [
        { link: `/projects/${this.project.uid}`, title: this.project.title },
        { link: `/projects/${this.project.uid}/monitors`, title: 'Monitors' },
      ];
    });

    this.pingSubscription = this.pingService
      .findAllByMonitor(this.projectUid, this.monitorUid)
      .subscribe((pings: PingModel[]) => this.pings = pings);

    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayedColumns = ['url', 'statusCode'];
          this.isSmallScreen = true;
        } else {
          this.displayedColumns = ['url', 'statusCode', 'duration', 'type', 'time'];
          this.isSmallScreen = false;
        }
      });
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.pingSubscription.unsubscribe();
  }
}
