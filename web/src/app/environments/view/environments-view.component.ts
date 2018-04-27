import { Component } from '@angular/core';
import { Environment } from "../environment.model";
import { EnvironmentService } from "../environment.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'qs-environments-view',
  templateUrl: './environments-view.component.html',
})
export class EnvironmentsViewComponent {

  public environment: Environment;

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentService
  ) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
  }

  refresh() {
    this.environmentService.findPublicById(this.route.snapshot.params['id']).subscribe((environment) => this.environment = environment);
  }
}
