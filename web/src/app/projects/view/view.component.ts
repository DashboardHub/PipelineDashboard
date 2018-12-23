import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProjectService } from '../../../services/project.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { ProjectModel, RepositoriesModel, RepositoryModel } from '../../../models/index.model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { DialogListComponent } from '../../dialog/list/dialog-list.component';
import { RepositoryService } from '../../../services/repository.service';

@Component({
    selector: 'dashboard-projects-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
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
        private authService: AuthenticationService,
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

    addRepository(): void {
        this.repositoryService
            .findAll()
            .subscribe((repositories: RepositoriesModel) => this.dialog.open(DialogListComponent, {
                    // width: '250px',
                    data: { project: this.project, repositories },
                })
                .afterClosed()
                .subscribe((selectedRepositories: { value: string }[]) => {
                    if (selectedRepositories && selectedRepositories.length > 0) {
                        this.projectService
                            .saveRepositories(
                                this.project.uid,
                                selectedRepositories.map((repo: { value: string }) => repo.value)
                            );

                            selectedRepositories.forEach((repository: RepositoriesModel) => this.repositoryService.findPullRequestsByRepoName())
                    }
                })
            );
    }

    isAdmin(): boolean {
        return this.project.access.admin.includes(this.authService.profile.uid);
    }

    ngDestroy(): void {
        this.projectSubscription
            .unsubscribe();
        this.deleteSubscription
            .unsubscribe();
        this.repositorySubscription
            .unsubscribe();
    }
}
