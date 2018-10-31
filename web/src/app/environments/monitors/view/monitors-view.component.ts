import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { List } from '../../../../models/list.model';
import { Environment } from '../../../../models/environment.model';
import { Monitor } from '../../../../models/monitor.model';
import { Pinged } from '../../../../models/pinged.model';
import { MonitorService } from '../../../../services/monitor.service';
import { PingedService } from '../../../../services/pinged.service';

import { DialogConfirmationComponent } from '../../../dialog/confirmation/dialog-confirmation.component';

@Component({
    selector: 'dashboard-monitors-view',
    templateUrl: './monitors-view.component.html'
})
export class MonitorsViewComponent implements OnDestroy {

    private subscription: Subscription;

    public environment: Environment;
    public monitor: Monitor;
    public pings: List<Pinged> = new List<Pinged>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private monitorService: MonitorService,
        private pingedService: PingedService
    ) {
        this.environment = this.route.snapshot.data.environment;
        this.pings = this.route.snapshot.data.pings;
        this.monitor = this.environment.monitors
            .find((monitor: Monitor) => monitor.id === this.route.snapshot.params.monitorId);
        this.subscription = interval(30000).pipe(takeWhile(() => true)).subscribe(() => this.refresh());
    }

    ping(): void {
        this.pingedService
            .ping(this.environment.id, this.monitor.id).subscribe(() => this.refresh());
    }

    refresh(): void {
        this.pingedService
            .findAll(this.environment.id, this.monitor.id).subscribe((pings: List<Pinged>) => this.pings = pings);
    }

    delete(): void {
        this.monitorService
            .delete(this.environment.id, this.monitor.id)
            .subscribe(() => this.router.navigate(['/environments', this.environment.id, 'monitors']));
    }

    deleteDialog(): void {
        let dialogRef: MatDialogRef<DialogConfirmationComponent, boolean> = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Confirm deletion',
                content: `Are you sure you want to delete the monitor "${this.monitor.path}"`
            }
        });

        dialogRef.afterClosed().subscribe((confirm: boolean) => {
            if (confirm) {
                this.delete();
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
