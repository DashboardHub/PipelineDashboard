import {Component, OnInit} from '@angular/core';

import {Environment} from './environment';
import {EnvironmentsService} from "./environments.service";

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css'],
  providers: [EnvironmentsService]
})
export class EnvironmentsComponent implements OnInit {

  environments: Array<Environment> = [];

  constructor(private environmentService: EnvironmentsService) {
  }

  ngOnInit() {
    this.getEnvironments();
  }

  getEnvironments(): void {
    this.environmentService
      .getEnvironments()
      .then((environments) => this.environments = environments);
  }

}
