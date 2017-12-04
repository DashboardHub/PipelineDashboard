import { Component, OnInit } from '@angular/core';

import { EnvironmentsService } from './../environments.service';
import { List } from './../list';
import { Environment } from './../environment';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
})
export class EnvironmentListComponent implements OnInit {

  environments: List<Environment> = new List<Environment>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
  }
}
