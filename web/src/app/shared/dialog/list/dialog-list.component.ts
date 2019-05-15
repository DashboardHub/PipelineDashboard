import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

// Dashboard hub services
import { RepositoryService } from '../../../core/services/repository.service';
import { ProjectModel, RepositoriesModel } from '../../models/index.model';
import { ActivityService } from '../../../core/services/activity.service';

@Component({
    selector: 'dashboard-dialog-list',
    templateUrl: './dialog-list.component.html',
})
export class DialogListComponent {

    private repositorySubscription: Subscription;

    constructor(
        private repositoryService: RepositoryService,
        public dialogRef: MatDialogRef<DialogListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { project: ProjectModel, repositories: RepositoriesModel },
        private activityService: ActivityService
    ) {
    }

    // @TODO: move out, otherwise can not be reused
    public refresh(): void {
        this.repositorySubscription = this.repositoryService
            .findAll(true)
            .pipe(
                tap(() => this.activityService.setProgressBar(false))
            )
            .subscribe((repositories: RepositoriesModel) => this.data.repositories = repositories);
    }

    ngDestroy(): void {
        this.repositorySubscription.unsubscribe();
    }
}
