import { Component, OnInit } from '@angular/core';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "../../../../core/animations";
import { List } from "../../list";
import { Deployed } from "./deployed";
import { MatTableDataSource } from "@angular/material";
import {DeployedService} from "./deployed.service";

@Component({
  selector   : 'app-deployed',
  templateUrl: './deployed.component.html',
  animations : fuseAnimations
})
export class DeployedComponent implements OnInit {

  environment: Environment = new Environment('');
  deploys: List<Deployed>;
  displayedColumns = ['release', 'state', 'token', 'when'];
  dataSource: MatTableDataSource<Deployed>;

  constructor(private route: ActivatedRoute, private deployedService: DeployedService) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    this.deploys = this.route.snapshot.data['deploys'];
    this.dataSource = new MatTableDataSource<Deployed>(this.deploys.list);
  }

  refresh() {
    this.deployedService.findAll(this.environment.id).subscribe((deploys) => this.dataSource = new MatTableDataSource<Deployed>(deploys.list));
  }

}
