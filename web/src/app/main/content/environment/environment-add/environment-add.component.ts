import { Component } from '@angular/core';
import { Environment } from "../environment";
import { EnvironmentService } from "../environment.service";
import { Router } from "@angular/router";

@Component({
  selector   : 'app-environment-add',
  templateUrl: './environment-add.component.html'
})
export class EnvironmentAddComponent
{

  environment: Environment = new Environment('');

  constructor(private environmentService: EnvironmentService, private router: Router) {

  }

  add(): void {
    this.environmentService
      .addEnvironment(this.environment)
      .subscribe(
        data => this.router.navigate(['/environment/' + data.id]),
        error => console.log(error)
      );
  }
}
