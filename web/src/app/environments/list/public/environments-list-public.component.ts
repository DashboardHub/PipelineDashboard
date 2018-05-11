import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Environment } from '../../environment.model';
import { List } from '../../../list';
import { EnvironmentService } from '../../environment.service';
import { Profile } from '../../../auth/profile';

@Component({
  selector: 'qs-environments-list-public',
  templateUrl: './environments-list-public.component.html',
})
export class EnvironmentsListPublicComponent implements OnInit {

  public environments: List<Environment> = new List<Environment>();
  public profile: Profile = new Profile();

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentService,
  ) {
  }

  ngOnInit(): void {
    this.environments = this.route.snapshot.data.environments;
  }

  refresh(): void {
    this.environmentService.findAll().subscribe((environments: List<Environment>) => this.environments = environments);
  }

}
