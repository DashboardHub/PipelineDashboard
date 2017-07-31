import {Component, OnInit} from '@angular/core';
import {Environment} from "../environment";
import {EnvironmentsService} from "../environments.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-environment-add',
  templateUrl: './environment-add.component.html',
  styleUrls: ['./environment-add.component.css'],
  providers: [EnvironmentsService]
})
export class EnvironmentAddComponent implements OnInit {

  environment: Environment = new Environment('');

  constructor(private router: Router, private environmentService: EnvironmentsService) {
  }

  ngOnInit() {

  }

  add(environment: Environment): void {
    this.environmentService
      .addEnvironment(this.environment)
      .then((environment) => this.router.navigate(['/environments/' + environment.id]));
  }

}
