import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Environment } from '../../../models/environment.model';
import { EnvironmentService } from '../../../services/environment.service';

@Component({
    selector: 'dashboard-environments-edit',
    templateUrl: './environments-edit.component.html'
})
export class EnvironmentsEditComponent implements OnInit {

    public environment: Environment = new Environment();
    public environmentForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private form: FormBuilder,
        private snackBar: MatSnackBar,
        private environmentService: EnvironmentService
    ) { }

    ngOnInit(): void {
        this.environment = this.route.snapshot.data.environment;

        this.environmentForm = this.form.group({
            type: ['build-deploy', [Validators.required]],
            title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            description: [undefined, [Validators.minLength(3), Validators.maxLength(1024)]],
            link: [undefined, [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
            logo: [undefined, [Validators.maxLength(1024), Validators.pattern(/^https:\/\//)]]
        });

        this.environmentForm.reset(this.environment);
    }

    updateEnvironment(): void {
        this.environmentService
            .update(this.environment.id, this.environmentForm.getRawValue())
            .subscribe(
                (environment: Environment) => this.router.navigate(['/environments', environment.id]),
                (error: any) => this.snackBar.open(error.message, undefined, { duration: 5000 })
            );
    }
}
