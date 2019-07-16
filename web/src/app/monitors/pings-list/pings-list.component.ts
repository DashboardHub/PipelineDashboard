import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Dashboard hub models
import { PingModel } from '../../shared/models/index.model';
import { PingService } from '../../core/services/index.service';

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

  constructor(
    private route: ActivatedRoute,
    private pingService: PingService,
  ) { }

  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.monitorUid = this.route.snapshot.paramMap.get('monitorUid');
    this.route.data.subscribe((data: { pings: PingModel[] }) => this.pings = data.pings);

    this.pingSubscription = this.pingService
      .findAllByMonitor(this.projectUid, this.monitorUid)
      .subscribe((pings: PingModel[]) => this.pings = pings);
  }

  ngOnDestroy(): void {
    this.pingSubscription.unsubscribe();
  }
}
