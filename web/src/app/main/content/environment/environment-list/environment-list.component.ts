import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";
import { List } from "../../list";

@Component({
    selector   : 'environment-list',
    templateUrl: './environment-list.component.html',
    styleUrls  : ['./environment-list.component.scss'],
    animations : fuseAnimations
})
export class EnvironmentListComponent implements OnInit {

  environments: List<Environment> = new List<Environment>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
  }

}
