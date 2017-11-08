import { Component, OnInit } from '@angular/core';

import { DeployedService } from './../deployed.service';
import { List } from './../../list';
import { ActivatedRoute } from "@angular/router";
import { Deployed } from "../deployed";

@Component({
  selector: 'app-deployed-list',
  templateUrl: './deployed-list.component.html',
  styleUrls: ['./deployed-list.component.css'],
  providers: [DeployedService]
})
export class DeployedListComponent implements OnInit {

  deployed: List<Deployed> = new List<Deployed>();

  constructor(
    private route: ActivatedRoute,
    private deployedService: DeployedService
  ) {
  }

  ngOnInit() {
    this.deployedService.subscribeDeployed()
      .subscribe(deployeds => {
        this.deployed = deployeds
      });

    this.getTokens(this.route.snapshot.params.id);
  }

  getTokens(environmentId: string): void {
    this.deployedService
      .getDeployed(environmentId);
  }
}
