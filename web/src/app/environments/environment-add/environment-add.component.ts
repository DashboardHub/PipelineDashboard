import {Component, OnInit} from '@angular/core';
import {Environment} from "../environment";
import {EnvironmentsService} from "../environments.service";

@Component({
  selector: 'app-environment-add',
  templateUrl: './environment-add.component.html',
  styleUrls: ['./environment-add.component.css'],
  providers: [EnvironmentsService]
})
export class EnvironmentAddComponent implements OnInit {

  environment: Environment = new Environment('');

    constructor(private environmentService: EnvironmentsService) {
  }

  ngOnInit() {

  }

  add(): void {
    this.environmentService
      .addEnvironment(this.environment);
  }

}
