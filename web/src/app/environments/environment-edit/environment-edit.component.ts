import { Component, OnInit } from '@angular/core';
import {EnvironmentsService} from "../environments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Environment} from "../environment";

@Component({
  selector: 'app-environment-edit',
  templateUrl: './environment-edit.component.html',
  styleUrls: ['./environment-edit.component.css'],
  providers: [EnvironmentsService]
})
export class EnvironmentEditComponent implements OnInit {
  environment: Environment = new Environment('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private environmentService: EnvironmentsService
  ) { }

  ngOnInit() {
    this.environment.id = this.route.snapshot.params.id;
    this.getEnvironment();
  }

  getEnvironment(): void {
    this.environmentService
      .getEnvironment(this.environment.id)
      .then((environment) => this.environment = environment);
  }

  save(environment: Environment): void {
    this.environmentService
      .saveEnvironment(this.environment)
      .then((environment) => console.log(environment)); // @TODO: redirect to details page
  }

}
