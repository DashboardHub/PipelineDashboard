import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {EnvironmentsService} from "../environments.service";
import {Environment} from "../environment";
import { Profile } from "../../auth/profile";

@Component({
  selector: 'app-environment-view',
  templateUrl: './environment-view.component.html',
  styleUrls: ['./environment-view.component.css']
})
export class EnvironmentViewComponent implements OnInit {
  environment: Environment;
  profile: Profile;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private environmentService: EnvironmentsService
  ) { }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];

    this.environmentService.subscribeEnvironment()
      .subscribe(environment => {
        this.environment = environment
      });
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
