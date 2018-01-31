import { Component } from '@angular/core';
import { Environment } from "../environment";
import { EnvironmentService } from "../environment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "../../../../core/animations";

@Component({
  selector   : 'app-environment-edit',
  templateUrl: './environment-edit.component.html',
  animations : fuseAnimations
})
export class EnvironmentEditComponent
{

  environment: Environment = new Environment('');

  constructor(private route: ActivatedRoute, private environmentService: EnvironmentService, private router: Router) {
    this.environment = this.route.snapshot.data['environment'];
  }

  save(): void {
    this.environmentService
      .saveEnvironment(this.environment)
      .subscribe(
        data => this.router.navigate(['/environment/' + data.id]),
        error => console.log(error)
      );
  }
}
