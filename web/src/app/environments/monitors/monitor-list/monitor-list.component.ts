import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { MonitorService } from './../monitors.service';
import { List } from './../../list';
import { Monitor } from './../monitor';
import { ActivatedRoute } from "@angular/router";
import { TdDialogService } from "@covalent/core";

import { Environment } from "../../environment";
import { State } from "../../deployed/state";

@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html'
})
export class MonitorListComponent implements OnInit {

  states: Array<State>;
  monitors: List<Monitor> = new List<Monitor>();
  environment: Environment;

  constructor(
    private route: ActivatedRoute,
    private dialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private monitorService: MonitorService
  ) {
  }

  ngOnInit() {
    this.monitorService.subscribeMonitors()
      .subscribe(monitors => {
        this.monitors = monitors
      });

    this.getMonitors(this.route.snapshot.params.id);
    this.environment = this.route.snapshot.data['environment'];
  }

  getMonitors(environmentId: string): void {
    this.monitorService
      .getMonitors(environmentId);
  }

  pingMonitor(monitor: Monitor): void {
    this.monitorService
      .pingMonitor(this.environment, monitor);
  }

  deleteMonitor(monitor: Monitor): void {
    monitor.environmentId = this.environment.id;
    this.monitorService
      .deleteMonitor(monitor);
  }
}
