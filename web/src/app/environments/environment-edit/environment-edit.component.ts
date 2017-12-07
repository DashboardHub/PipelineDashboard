import { Component, OnInit } from '@angular/core';
import { EnvironmentsService } from "../environments.service";
import { ActivatedRoute } from "@angular/router";
import { Environment } from "../environment";

@Component({
  selector: 'app-environment-edit',
  templateUrl: './environment-edit.component.html',
  styleUrls: ['./environment-edit.component.css']
})
export class EnvironmentEditComponent implements OnInit {
  environment: Environment = new Environment('');

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentsService
  ) { }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
  }

  save(): void {
    this.environmentService
      .saveEnvironment(this.environment);
  }

}
