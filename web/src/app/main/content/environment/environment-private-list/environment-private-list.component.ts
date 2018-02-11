import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";
import { List } from "../../list";
import {Profile} from "../../auth/profile";
import { EnvironmentService } from '../environment.service';

@Component({
    selector   : 'app-environment-private-list',
    templateUrl: './environment-private-list.component.html',
    animations : fuseAnimations
})
export class EnvironmentPrivateListComponent implements OnInit {

  environments: List<Environment> = new List<Environment>();
  profile: Profile;

  constructor(private route: ActivatedRoute, private environmentService: EnvironmentService) {
  }

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
    this.profile = this.route.snapshot.data['profile'];
  }

  refresh() {
    this.environmentService.getEnvironments().subscribe((environments) => this.environments = environments);
  }
}
