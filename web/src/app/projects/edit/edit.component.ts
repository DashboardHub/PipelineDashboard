import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Dashboard hub models
import { RepositoryModel, ProjectModel } from '../../../models/index.model';

// Dashboard hub services
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';

@Component({
    selector: 'dashboard-projects-edit',
    templateUrl: './edit.component.html',
})
export class EditProjectComponent implements OnInit {
    private projectSubscription: Subscription;
    private saveSubscription: Subscription;
    public uid: string;
    public projectForm: FormGroup;
    public repositories: RepositoryModel[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private form: FormBuilder,
        private snackBar: MatSnackBar,
        private projectService: ProjectService,
     ) {
        this.uid = this.route.snapshot.paramMap.get('uid');
    }

    ngOnInit(): void {
        this.projectForm = this.form.group({
            type: [undefined, [Validators.required]],
            title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            description: [undefined, [Validators.minLength(3), Validators.maxLength(1024)]],
        });

        this.projectSubscription = this.projectService
            .findOneById(this.uid)
            .subscribe((project: ProjectModel) => {
                    this.projectForm.reset(project);
            });
    }

    save(): void {
        this.saveSubscription = this.projectService
            .save({ uid: this.uid, ...this.projectForm.getRawValue() })
            .pipe(
                catchError((error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 }))
            )
            .subscribe(() => this.router.navigate(['/project', this.uid]));
    }

    ngDestroy(): void {
        this.projectSubscription.unsubscribe();
        this.saveSubscription.unsubscribe();
    }
}
