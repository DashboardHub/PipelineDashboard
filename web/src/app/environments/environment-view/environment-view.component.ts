import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {EnvironmentsService} from "../environments.service";
import {Environment} from "../environment";
import { Profile } from "../../auth/profile";

@Component({
  selector: 'app-environment-view',
  templateUrl: './environment-view.component.html',
  styleUrls: ['./environment-view.component.css'],
  providers: [EnvironmentsService]
})
export class EnvironmentViewComponent implements OnInit {
  environment: Environment = new Environment('');
  profile: Profile;

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
      .subscribe(
        data => this.environment = data,
        error => console.log(error)
      );
  }

  deleteEnvironment(): void {
    this.environmentService
      .deleteEnvironment(this.environment.id)
      .subscribe(
        data =>  this.router.navigate(['/environments/list']),
        error => console.log(error)
      );
  }
}
