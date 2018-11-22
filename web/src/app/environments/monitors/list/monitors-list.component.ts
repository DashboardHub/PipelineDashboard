import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { List } from '../../../../models/list.model';
import { Environment } from '../../../../models/environment.model';
import { Monitor } from '../../../../models/monitor.model';
import { MonitorService } from '../../../../services/monitor.service';

@Component({
    selector: 'dashboard-monitors-list',
    templateUrl: './monitors-list.component.html'
})
export class MonitorsListComponent implements OnDestroy {

    private subscription: Subscription;

    public environment: Environment;
    public monitors: List<Monitor>;

    constructor(private route: ActivatedRoute, private monitorService: MonitorService) {
        this.environment = this.route.snapshot.data.environment;
        this.monitors = this.route.snapshot.data.monitors;
        this.subscription = interval(30000).pipe(takeWhile(() => true)).subscribe(() => this.refresh());
    }

    refresh(): void {
        this.monitorService
            .findAll(this.environment.id)
            .subscribe((monitors: List<Monitor>) => this.monitors = monitors);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
