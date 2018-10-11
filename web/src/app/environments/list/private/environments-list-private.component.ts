import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';

import { List } from '../../../../models/list.model';
import { Environment } from '../../../../models/environment.model';
import { EnvironmentService } from '../../../../services/environment.service';

@Component({
    selector: 'dashboard-environments-list-private',
    templateUrl: './environments-list-private.component.html'
})
export class EnvironmentsListPrivateComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    public environments: List<Environment> = new List<Environment>();

    constructor(
        private route: ActivatedRoute,
        private environmentService: EnvironmentService
    ) {
        this.subscription = Observable.interval(30000).takeWhile(() => true).subscribe(() => this.refresh());
    }

    ngOnInit(): void {
        this.environments = this.route.snapshot.data.environments;
    }

    refresh(): void {
        this.environmentService.findAllByOwner().subscribe((environments: List<Environment>) => this.environments = environments);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
