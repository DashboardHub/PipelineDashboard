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
import { DatePipe } from '@angular/common';

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
  graph: any = {
    chartType: 'line',
    datasets : {
      duration: [
        {
          label: 'Duration (ms)',
          data: [],
          fill: 'start'
        }
      ]
    },
    labels   : [],
    colors   : [
      {
        borderColor              : '#42a5f5',
        backgroundColor          : '#42a5f5',
        pointBackgroundColor     : '#1e88e5',
        pointHoverBackgroundColor: '#1e88e5',
        pointBorderColor         : '#ffffff',
        pointHoverBorderColor    : '#ffffff'
      }
    ],
    options  : {
      spanGaps           : false,
      legend             : {
        display: false
      },
      maintainAspectRatio: false,
      layout             : {
        padding: {
          top  : 32,
          left : 32,
          right: 32
        }
      },
      elements           : {
        point: {
          radius          : 4,
          borderWidth     : 2,
          hoverRadius     : 4,
          hoverBorderWidth: 2
        },
        line : {
          tension: 0
        }
      },
      scales             : {
        xAxes: [
          {
            gridLines: {
              display       : true,
              drawBorder    : false,
              tickMarkLength: 18
            },
            ticks    : {
              fontColor: '#ffffff'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks  : {
              min     : 0,
              max     : 100,
              stepSize: 20
            }
          }
        ]
      },
      plugins            : {
        filler      : {
          propagate: false
        },
        xLabelsOnTop: {
          active: true
        }
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private pingedService: PingedService,
    private pipe: OrderByPipe,
    private monitorService: MonitorService,
    private datePipe: DatePipe
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
          this.graph.labels = this.pipe.transform(pings.list, '+createdAt').map((ping) => this.datePipe.transform(new Date(ping.createdAt), 'MMM d, H:mm:ss'));
          this.graph.datasets.duration[0].data = this.pipe.transform(pings.list, '+createdAt').map((ping) => ping.duration);
          this.graph.options.scales.yAxes[0].ticks.max = Math.max(...this.graph.datasets.duration[0].data);
          this.graph.options.scales.yAxes[0].ticks.stepSize = Math.ceil(this.graph.options.scales.yAxes[0].ticks.max / 5);
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
