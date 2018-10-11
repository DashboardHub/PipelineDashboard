import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';

import { List } from '../../../../models/list.model';
import { Environment } from '../../../../models/environment.model';
import { Profile } from '../../../../models/profile.model';
import { EnvironmentService } from '../../../../services/environment.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'dashboard-environments-list-public',
    templateUrl: './environments-list-public.component.html'
})
export class EnvironmentsListPublicComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    public environments: List<Environment> = new List<Environment>();
    public profile: Profile = new Profile();

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private environmentService: EnvironmentService
    ) {
        this.subscription = Observable.interval(30000).takeWhile(() => true).subscribe(() => this.refresh());
    }

    ngOnInit(): void {
        this.environments = this.route.snapshot.data.environments;
    }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    refresh(): void {
        this.environmentService.findAll().subscribe((environments: List<Environment>) => this.environments = environments);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
