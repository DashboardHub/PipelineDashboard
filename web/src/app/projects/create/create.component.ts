import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from '../../core/services/project.service';
import { catchError } from 'rxjs/operators';
import { ProjectModel } from '../../../models/index.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'dashboard-projects-create',
    templateUrl: './create.component.html',
})
export class CreateProjectComponent implements OnInit {

    private createSubscription: Subscription;
    public projectForm: FormGroup;

    constructor(
        private router: Router,
        private form: FormBuilder,
        private snackBar: MatSnackBar,
        private projectService: ProjectService,
    ) { }

    ngOnInit(): void {
        this.projectForm = this.form.group({
            type: [undefined, [Validators.required]],
            title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            description: [undefined, [Validators.minLength(3), Validators.maxLength(1024)]],
        });
    }

    create(): void {
        this.createSubscription = this.projectService
            .create(this.projectForm.getRawValue())
            .pipe(
                catchError((error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 }))
            )
            .subscribe((project: ProjectModel) => this.router.navigate(['/projects', project.uid]));
    }

    ngDestroy(): void {
        this.createSubscription
            .unsubscribe();
    }
}
