import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";
import { List } from "../../list";
import { Profile } from "../../auth/profile";
import { EnvironmentService } from '../environment.service';

@Component({
    selector   : 'app-environment-public-list',
    templateUrl: './environment-public-list.component.html',
    animations : fuseAnimations
})
export class EnvironmentPublicListComponent implements OnInit {

  environments: List<Environment> = new List<Environment>();
  profile: Profile;
  graph: any = {
    chartType: 'bar',
    datasets : {
      releases: [
        {
          label: 'Releases',
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

  constructor(private route: ActivatedRoute, private environmentService: EnvironmentService) {
  }

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
    this.profile = this.route.snapshot.data['profile'];

    this.graph.labels = this.environments.list.map((environment) => environment.title);
    this.graph.datasets.releases[0].data = this.environments.list.map((environment) => environment.releases);
    this.graph.options.scales.yAxes[0].ticks.max = Math.max(...this.graph.datasets.releases[0].data);
    this.graph.options.scales.yAxes[0].ticks.stepSize = Math.ceil(this.graph.options.scales.yAxes[0].ticks.max / 5);
  }

  refresh() {
    this.environmentService.getPublicEnvironments().subscribe((environments) => this.environments = environments);
  }
}
