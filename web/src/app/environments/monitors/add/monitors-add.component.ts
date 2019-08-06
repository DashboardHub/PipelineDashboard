import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Environment } from '../../../../models/environment.model';
import { Monitor } from '../../../../models/monitor.model';
import { MonitorService } from '../../../../services/monitor.service';

@Component({
    selector: 'dashboard-monitors-add',
    templateUrl: './monitors-add.component.html'
})
export class MonitorsAddComponent implements OnInit {

    public environment: Environment;
    public monitorForm: FormGroup;

    public httpMethods: { label: string, value: string }[] = [
        { label: 'GET', value: 'GET' }
    ];

    public statusCodes: { label: string, value: number }[] = [
        { label: '200', value: 200 },
        { label: '201', value: 201 },
        { label: '204', value: 204 },
        { label: '400', value: 400 },
        { label: '404', value: 404 }
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private form: FormBuilder,
        private monitorService: MonitorService
    ) {
    }

    ngOnInit(): void {
        this.environment = this.route.snapshot.data.environment;

        this.monitorForm = this.form.group({
            method: ['GET', [Validators.required]],
            path: [undefined, [Validators.required, Validators.maxLength(512)]],
            expectedCode: [200, [Validators.required]],
            expectedText: [undefined, [Validators.maxLength(1024)]]
        });
    }

    createMonitor(): void {
        const form: any = this.monitorForm.getRawValue();

        this.monitorService
            .add(this.environment.id, form)
            .subscribe(
                (monitor: Monitor) => this.router.navigate(['/environments', this.environment.id, 'monitors', monitor.id]),
                (error: any) => this.snackBar.open(error.message, undefined, { duration: 5000 })
            );
    }
}
