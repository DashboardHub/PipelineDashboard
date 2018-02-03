import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";
import { List } from "../../list";
import {Profile} from "../../auth/profile";

@Component({
    selector   : 'environment-list',
    templateUrl: './environment-list.component.html',
    styleUrls  : ['./environment-list.component.scss'],
    animations : fuseAnimations
})
export class EnvironmentListComponent implements OnInit {

  environments: List<Environment> = new List<Environment>();
  profile: Profile;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
    this.profile = this.route.snapshot.data['profile'];
  }

}
