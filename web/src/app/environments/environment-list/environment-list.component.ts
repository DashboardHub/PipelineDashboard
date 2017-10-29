import { Component, OnInit } from '@angular/core';

import { EnvironmentsService } from './../environments.service';
import { List } from './../list';
import { Environment } from './../environment';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css'],
  providers: [EnvironmentsService]
})
export class EnvironmentListComponent implements OnInit {

  environments: List<Environment> = new List<Environment>();

  constructor(private environmentService: EnvironmentsService) {
  }

  ngOnInit() {
    this.getEnvironments();
  }

  getEnvironments(): void {
    this.environmentService
      .getEnvironments()
      .subscribe(
        data => this.environments = data,
        error => console.log(error)
      );
  }

}
