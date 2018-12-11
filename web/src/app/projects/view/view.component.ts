import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from '../../../services/project.service';
import { catchError } from 'rxjs/operators';
import { ProjectModel } from '../../../models/index.model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
    selector: 'dashboard-projects-view',
    templateUrl: './view.component.html',
})
export class ViewProjectComponent implements OnInit {

    private projectSubscription: Subscription;
    private deleteSubscription: Subscription;
    public project: ProjectModel = new ProjectModel();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private projectService: ProjectService,
        public authService: AuthenticationService,
    ) {
        this.project.uid = this.route.snapshot.paramMap.get('uid');
    }

    ngOnInit(): void {
        this.projectSubscription = this.projectService
            .findOneById(this.project.uid)
            .subscribe((project: ProjectModel) => this.project = project);
    }

    delete(): void {
        this.deleteSubscription = this.projectService
            .delete(this.project.uid)
            .pipe(
                catchError((error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 }))
            )
            .subscribe(() => this.router.navigate(['/projects']));
    }

    ngDestroy(): void {
        this.projectSubscription
            .unsubscribe();
    }
}
