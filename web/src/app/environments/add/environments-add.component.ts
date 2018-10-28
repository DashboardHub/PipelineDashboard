import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Environment } from '../../../models/environment.model';
import { EnvironmentService } from '../../../services/environment.service';

@Component({
    selector: 'qs-environments-add',
    templateUrl: './environments-add.component.html',
})
export class EnvironmentsAddComponent implements OnInit {

    public environment: Environment;
    public environmentForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private form: FormBuilder,
        private snackBar: MatSnackBar,
        private environmentService: EnvironmentService,
    ) { }

    ngOnInit(): void {
        this.environment = this.route.snapshot.data.environment;

        this.environmentForm = this.form.group({
            type: ['build-deploy', [Validators.required]],
            title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            description: [undefined, [Validators.minLength(3), Validators.maxLength(1024)]],
            link: [undefined, [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
            logo: [undefined, [Validators.maxLength(1024), Validators.pattern(/^https:\/\//)]]
        })
    }

    createEnvironment(): void {
        const form: AbstractControl = this.environmentForm;

        this.environmentService
            .add(form.value)
            .subscribe(
                (environment: Environment) => this.router.navigate(['/environments', environment.id]),
                (error: any) => this.snackBar.open(error.message, undefined, { duration: 5000 }),
            );
    }

}
