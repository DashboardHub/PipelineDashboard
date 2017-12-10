import { Component, OnInit } from '@angular/core';

import { List } from './../list';
import { Environment } from './../environment';
import { ActivatedRoute } from "@angular/router";
import { Profile } from "../../auth/profile";

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
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
