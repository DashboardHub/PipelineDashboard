import { Component, OnInit } from '@angular/core';
import { Environment } from "./../../environment";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "./../../../../../core/animations";
import { List } from "./../../../list";
import { MatTableDataSource } from "@angular/material";
import { Release } from "../release";
import { DeployedService } from "../deployed.service";

@Component({
  selector   : 'app-release',
  templateUrl: './release.component.html',
  animations : fuseAnimations
})
export class ReleaseComponent implements OnInit {

  environment: Environment = new Environment('');
  releases: List<Release> = new List();
  displayedColumns = ['release', 'state', 'token', 'when', 'duration'];
  dataSource: MatTableDataSource<Release>;
  graph: any = {
    chartType: 'line',
    datasets : {
      duration: [
        {
          label: 'Duration (s)',
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

  constructor(private route: ActivatedRoute, private deployedService: DeployedService) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    this.releases = this.route.snapshot.data['releases'];

    this.refresh();
  }

  refresh() {
    this.deployedService
      .findAllReleases(this.environment.id)
      .subscribe((releases) => {
        this.releases = releases;
        this.dataSource = new MatTableDataSource<Release>(releases.list);
        this.graph.labels = releases.list.map((release) => release.version);
        this.graph.datasets.duration[0].data = releases.list.map((release) => release.duration);
        this.graph.options.scales.yAxes[0].ticks.max = Math.max(...this.graph.datasets.duration[0].data);
        this.graph.options.scales.yAxes[0].ticks.stepSize = Math.ceil(this.graph.options.scales.yAxes[0].ticks.max / 5);
      });
  }

}
