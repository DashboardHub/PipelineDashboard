import { Component, OnInit } from '@angular/core';
import { Environment } from "../environment";
import {ActivatedRoute} from "@angular/router";
import { fuseAnimations } from "../../../../core/animations";
import { MatTableDataSource } from "@angular/material";
import {Pinged} from "./pinged/pinged";
import {PingedService} from "./pinged/pinged.service";
import {OrderByPipe} from "ngx-pipes";
import {List} from "../../list";
import {Monitor} from "./monitor";
import {MonitorService} from "./monitor.service";

@Component({
  selector   : 'app-monitor',
  templateUrl: './monitor.component.html',
  providers: [OrderByPipe],
  animations : fuseAnimations
})
export class MonitorComponent implements OnInit {

  environment: Environment = new Environment('');
  monitor: Monitor = new Monitor('');
  displayedColumns = ['url', 'statusCode', 'codeMatched', 'textMatched', 'duration', 'createdAt'];
  pings: List<Pinged> = new List<Pinged>();
  dataSource: MatTableDataSource<Pinged>;

  constructor(
    private route: ActivatedRoute,
    private pingedService: PingedService,
    private pipe: OrderByPipe,
    private monitorService: MonitorService
  ) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    if (this.environment.monitors.length) {
      this.monitor = this.environment.monitors[0];
    }
    this.monitor.environmentId = this.environment.id;

    this.refresh();
  }

  refresh() {
    if (this.environment.monitors.length) {
      this.pingedService
        .findAll(this.environment.id, this.environment.monitors[0].id)
        .subscribe((pings) => {
          this.pings = pings;
          this.dataSource = new MatTableDataSource<Pinged>(this.pipe.transform(pings.list, '-createdAt'));
        });
    }
  }

  ping() {
    this.pingedService
      .ping(this.environment.id, this.environment.monitors[0].id)
      .subscribe((ping) => {
        this.refresh();
      });
  }

  add(): void {
    this.monitorService
      .add(this.monitor)
      .subscribe((monitor) => {
        this.environment.monitors.push(monitor);
        this.monitor = monitor;
        this.monitor.environmentId = this.environment.id;
      });
  }

  delete(): void {
    this.monitorService
      .delete(this.monitor)
      .subscribe((monitors) => {
        this.monitor = new Monitor('');
        this.monitor.environmentId = this.environment.id;
        this.environment.monitors = monitors.list;
        this.pings = new List<Pinged>();
        this.dataSource = new MatTableDataSource<Pinged>(this.pings.list);
      });
  }

}
