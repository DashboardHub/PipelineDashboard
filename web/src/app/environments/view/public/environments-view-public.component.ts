import { Component, OnDestroy, OnInit } from '@angular/core';
import { Environment } from '../../environment.model';
import { Profile } from '../../../auth/profile';
import { EnvironmentService } from '../../environment.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from '../../../../../node_modules/rxjs/Rx';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'qs-environments-view-public',
  templateUrl: './environments-view-public.component.html',
})
export class EnvironmentsViewPublicComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public environment: Environment = new Environment();
  public profile: Profile = new Profile();

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentService,
  ) {
    this.subscription = Observable.interval(30000).takeWhile(() => true).subscribe(() =>  this.refresh());
  }

  ngOnInit(): void {
    this.environment = this.route.snapshot.data.environment;
  }
  refresh(): void {
    this.environmentService.findPublicById(this.route.snapshot.params.id).subscribe((environment: Environment) => this.environment = environment);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
