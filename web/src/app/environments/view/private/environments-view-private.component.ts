import { Component, OnInit } from '@angular/core';
import { Environment } from '../../environment.model';
import { Profile } from '../../../auth/profile';
import { EnvironmentService } from '../../environment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'qs-environments-view-private',
  templateUrl: './environments-view-private.component.html',
})
export class EnvironmentsViewPrivateComponent implements OnInit {

  public environment: Environment = new Environment();
  public profile: Profile = new Profile();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private environmentService: EnvironmentService,
  ) {
  }

  ngOnInit(): void {
    this.environment = this.route.snapshot.data.environment;
  }

  refresh(): void {
    this.environmentService
      .findPrivateById(this.route.snapshot.params.id)
      .subscribe((environment: Environment) => this.environment = environment);
  }

  delete(): void {
    this.environmentService
      .deleteById(this.environment.id)
      .subscribe(() => this.router.navigate(['/environments/list']));
  }
}