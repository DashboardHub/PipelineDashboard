import {Component, OnInit} from '@angular/core';
import { Monitor } from "../monitor";
import { ActivatedRoute } from "@angular/router";
import { MonitorService } from "../monitors.service";

@Component({
  selector: 'app-monitor-add',
  templateUrl: './monitor-add.component.html'
})
export class MonitorAddComponent implements OnInit {

  monitor: Monitor = new Monitor('');

  constructor(
    private route: ActivatedRoute,
    private monitorService: MonitorService)
  {
  }

  ngOnInit() {
    this.monitor.environmentId = this.route.snapshot.params.id;
  }

  add(): void {
    this.monitorService
      .addMonitor(this.monitor);
  }

}
