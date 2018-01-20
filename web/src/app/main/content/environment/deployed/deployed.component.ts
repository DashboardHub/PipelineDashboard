import { Component, OnInit, ViewChild } from '@angular/core';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "../../../../core/animations";
import { List } from "../../list";
import { Deployed } from "./deployed";
import { MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector   : 'app-deployed',
  templateUrl: './deployed.component.html',
  animations : fuseAnimations
})
export class DeployedComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  environment: Environment = new Environment('');
  deploys: List<Deployed>;
  displayedColumns = ['release', 'state', 'token', 'when'];
  dataSource: MatTableDataSource<Deployed>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    this.deploys = this.route.snapshot.data['deploys'];
    this.dataSource = new MatTableDataSource<Deployed>(this.deploys.list);
  }

}
