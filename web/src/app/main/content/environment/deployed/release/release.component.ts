import { Component, OnInit } from '@angular/core';
import { Environment } from "./../../environment";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "./../../../../../core/animations";
import { List } from "./../../../list";
import { MatTableDataSource } from "@angular/material";
import { Release } from "../release";

@Component({
  selector   : 'app-release',
  templateUrl: './release.component.html',
  animations : fuseAnimations
})
export class ReleaseComponent implements OnInit {

  environment: Environment = new Environment('');
  releases: List<Release>;
  displayedColumns = ['release', 'state', 'token', 'when'];
  dataSource: MatTableDataSource<Release>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    this.releases = this.route.snapshot.data['releases'];
    this.dataSource = new MatTableDataSource<Release>(this.releases.list);
  }

}
