import { Component, OnInit } from '@angular/core';

import { Environment } from './environment';
import {EnvironmentsService} from "./environments.service";

@Component({
  selector: 'app-enviromnents',
  templateUrl: './enviromnents.component.html',
  styleUrls: ['./enviromnents.component.css'],
  providers: [EnvironmentsService]
})
export class EnviromnentsComponent implements OnInit {

  environments: Array<Environment> = [];

  constructor(private environmentService: EnvironmentsService) { }

  ngOnInit() {
    this.getEnvironments();
  }

  getEnvironments(): void {
    this.environmentService
      .getEnvironments()
      .then((environments) => this.environments = environments);
  }

}
