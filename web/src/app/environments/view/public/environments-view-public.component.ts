import { Component, OnInit } from '@angular/core';
import { Environment } from '../../environment.model';
import { Profile } from '../../../auth/profile';
import { EnvironmentService } from '../../environment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'qs-environments-view-public',
  templateUrl: './environments-view-public.component.html',
})
export class EnvironmentsViewPublicComponent implements OnInit {

  public environment: Environment = new Environment();
  public profile: Profile = new Profile();

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentService
  ) {

  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    this.profile = this.route.snapshot.data['profile'];
  }
  refresh(): void {
    this.environmentService.findPublicById(this.route.snapshot.params['id']).subscribe((environment) => this.environment = environment);
  }
}
