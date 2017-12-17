import { Component, OnInit } from '@angular/core';

import { DeployedService } from './../deployed.service';
import { List } from './../../list';
import { ActivatedRoute } from "@angular/router";
import { Deployed } from "../deployed";
import { Release } from "../releases";

@Component({
  selector: 'app-deployed-summary',
  templateUrl: './deployed-summary.component.html',
  styleUrls: ['./deployed-summary.component.css']
})
export class DeployedSummaryComponent implements OnInit {

  deployed: List<Deployed> = new List<Deployed>();
  releases: List<Release> = new List<Release>();

  constructor(
    private route: ActivatedRoute,
    private deployedService: DeployedService
  ) {
  }

  ngOnInit() {
    this.deployedService.subscribeReleases()
      .subscribe(releases => {
        this.releases = releases
      });

    this.getReleases(this.route.snapshot.params.id);
  }

  getReleases(environmentId: string): void {
    this.deployedService
      .getReleases(environmentId);
  }
}
