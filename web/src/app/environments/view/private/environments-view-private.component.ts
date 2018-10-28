import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { DialogConfirmationComponent } from '../../../dialog/confirmation/dialog-confirmation.component';

import { Environment } from '../../../../models/environment.model';
import { Profile } from '../../../../models/profile.model';
import { EnvironmentService } from '../../../../services/environment.service';

@Component({
    selector: 'qs-environments-view-private',
    templateUrl: './environments-view-private.component.html',
})
export class EnvironmentsViewPrivateComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    public environment: Environment = new Environment();
    public profile: Profile = new Profile();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private environmentService: EnvironmentService,
    ) {
        this.subscription = interval(30000).pipe(takeWhile(() => true)).subscribe(() => this.refresh());
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

    deleteDialog(): void {
        let dialogRef: MatDialogRef<DialogConfirmationComponent, boolean> = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: `Are you sure you want to delete the environment "${this.environment.title}"`,
            },
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
