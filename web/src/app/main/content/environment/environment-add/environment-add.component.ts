import { Component } from '@angular/core';
import { Environment } from "../environment";
import { EnvironmentService } from "../environment.service";

@Component({
  selector   : 'app-environment-add',
  templateUrl: './environment-add.component.html',
  styleUrls  : ['./environment-add.component.scss']
})
export class EnvironmentAddComponent
{

  environment: Environment = new Environment('');

  constructor(private environmentService: EnvironmentService) {

  }

  add(): void {
    this.environmentService
      .addEnvironment(this.environment)
      .subscribe(
        // data => this.router.navigate(['/environments/' + data.id]),
        data => console.log(data),
        error => console.log(error)
      );
  }
}
