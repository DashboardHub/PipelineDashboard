import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Environment } from '../../../../models/environment.model';
import { Profile } from '../../../../models/profile.model';
import { EnvironmentService } from '../../../../services/environment.service';

@Component({
    selector: 'dashboard-environments-list-public',
    templateUrl: './environments-list-public.component.html'
})
export class EnvironmentsListPublicComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    public environments: Environment[];
    public profile: Profile = new Profile();

    constructor(
        private route: ActivatedRoute,
        private environmentService: EnvironmentService
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.environmentService
            .findAll()
            .subscribe((environments: Environment[]) => this.environments = environments);
    }

    refresh(): void {
        this.environmentService.findAll().subscribe((environments: Environment[]) => this.environments = environments);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
