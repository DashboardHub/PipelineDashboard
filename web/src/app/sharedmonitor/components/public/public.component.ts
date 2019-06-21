import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { Router } from '@angular/router';
import { MonitorService } from '../../../core/services/index.service';
import { MonitorModel } from '../../models/index.model';

@Component({
  selector: 'dashboard-monitors-public',
  templateUrl: './public.component.html',
})
export class PublicMonitorsComponent implements OnInit {

  private monitorSubscription: Subscription;
  public monitors: MonitorModel[] = [];
  @Input() title: string = 'My Monitors';

  constructor(
    private monitorService: MonitorService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.monitorSubscription = this.monitorService
        .findPublicMonitors()
        .subscribe((monitors: MonitorModel[]) => this.monitors = monitors);
    } else {
      this.monitorSubscription = this.monitorService
        .findMyMonitors()
        .subscribe((monitors: MonitorModel[]) => this.monitors = monitors);
    }
  }

  ngDestroy(): void {
    this.monitorSubscription
      .unsubscribe();
  }
}
