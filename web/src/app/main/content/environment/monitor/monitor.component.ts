import { Component, OnInit } from '@angular/core';
import { Environment } from "../environment";
import {ActivatedRoute} from "@angular/router";
import { fuseAnimations } from "../../../../core/animations";
import { MatTableDataSource } from "@angular/material";
import {Pinged} from "./pinged/pinged";
import {PingedService} from "./pinged/pinged.service";
import {OrderByPipe} from "ngx-pipes";
import {List} from "../../list";

@Component({
  selector   : 'app-monitor',
  templateUrl: './monitor.component.html',
  providers: [OrderByPipe],
  animations : fuseAnimations
})
export class MonitorComponent implements OnInit {

  environment: Environment = new Environment('');
  displayedColumns = ['url', 'statusCode', 'codeMatched', 'textMatched', 'duration', 'createdAt'];
  pings: List<Pinged>;
  dataSource: MatTableDataSource<Pinged>;

  constructor(private route: ActivatedRoute, private pingedService: PingedService, private pipe: OrderByPipe) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    this.pings = this.route.snapshot.data['pings'];

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

}
