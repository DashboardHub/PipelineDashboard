import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { catchError, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Dashboard hub models
import { ProjectModel } from '../../../models/index.model';

// Dashboard hub dialog component
import { DialogListComponent } from '../../dialog/list/dialog-list.component';

// Dashboard hub services
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';
import { RepositoryService } from '../../../services/repository.service';

@Component({
    selector: 'dashboard-projects-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})

export class ViewProjectComponent implements OnInit {
    private projectSubscription: Subscription;
    private deleteSubscription: Subscription;
    private repositorySubscription: Subscription;
    public project: ProjectModel = new ProjectModel();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private projectService: ProjectService,
        private repositoryService: RepositoryService,
        private authService: AuthenticationService
    ) {
        this.project.uid = this.route.snapshot.paramMap.get('uid');
    }

    ngOnInit(): void {
        this.projectSubscription = this.projectService
            .findOneById(this.project.uid)
            .subscribe((project: ProjectModel) => {
                this.project = project;
            });
    }

    delete(): void {
        this.deleteSubscription = this.projectService
            .delete(this.project.uid)
            .pipe(
                catchError(
                    (error: any): any =>
                        this.snackBar.open(error.message, undefined, {
                            duration: 5000
                        })
                )
            )
            .subscribe(() => this.router.navigate(['/projects']));
    }

    addRepository(): void {
        this.dialog
            .open(DialogListComponent, {
                data: {
                    project: this.project,
                    repositories: this.authService.profile.repositories
                }
            })
            .afterClosed()
            .pipe(
                filter(
                    (selectedRepositories: { value: string }[]) =>
                        !!selectedRepositories
                )
            )
            .subscribe((selectedRepositories: { value: string }[]) => {
                this.projectService.saveRepositories(
                    this.project.uid,
                    selectedRepositories.map(
                        (fullName: { value: string }) => fullName.value
                    )
                );

                selectedRepositories.forEach((fullName: { value: string }) =>
                    this.repositoryService.loadRepository(fullName.value)
                );
            });
    }

    isAdmin(): boolean {
        return this.project.access.admin.includes(this.authService.profile.uid);
    }

    ngDestroy(): void {
        this.projectSubscription.unsubscribe();
        this.deleteSubscription.unsubscribe();
        this.repositorySubscription.unsubscribe();
    }
}
