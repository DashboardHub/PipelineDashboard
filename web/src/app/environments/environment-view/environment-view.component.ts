import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {EnvironmentsService} from "../environments.service";
import {Environment} from "../environment";

@Component({
  selector: 'app-environment-view',
  templateUrl: './environment-view.component.html',
  styleUrls: ['./environment-view.component.css'],
  providers: [EnvironmentsService]
})
export class EnvironmentViewComponent implements OnInit {
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
}
