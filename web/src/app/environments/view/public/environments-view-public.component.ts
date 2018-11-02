import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Environment } from '../../../../models/environment.model';
import { Profile } from '../../../../models/profile.model';
import { EnvironmentService } from '../../../../services/environment.service';

@Component({
    selector: 'dashboard-environments-view-public',
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
        this.subscription = interval(30000).pipe(takeWhile(() => true)).subscribe(() => this.refresh());
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
