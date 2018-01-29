import { Component, OnInit } from '@angular/core';
import { Environment } from "../environment";
import {ActivatedRoute} from "@angular/router";
import { fuseAnimations } from "../../../../core/animations";
import { MatTableDataSource } from "@angular/material";
import {Pinged} from "./pinged/pinged";
import {PingedService} from "./pinged/pinged.service";

@Component({
  selector   : 'app-monitor',
  templateUrl: './monitor.component.html',
  animations : fuseAnimations
})
export class MonitorComponent implements OnInit {

  environment: Environment = new Environment('');
  displayedColumns = ['url', 'statusCode', 'codeMatched', 'textMatched', 'duration', 'createdAt'];
  dataSource: MatTableDataSource<Pinged>;

  constructor(private route: ActivatedRoute, private pingedService: PingedService) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];

    this.refresh();
  }

  refresh() {
    if (this.environment.monitors.length) {
      this.pingedService
        .findAll(this.environment.id, this.environment.monitors[0].id)
        .subscribe((pings) => this.dataSource = new MatTableDataSource<Pinged>(pings.list));
    }
  }

}
