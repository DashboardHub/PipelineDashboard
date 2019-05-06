import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

// Dashboard hub services
import { RepositoryService } from '../../../core/services/repository.service';
import { ProjectModel, RepositoriesModel } from '../../models/index.model';

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
    ) {
    }

    // @TODO: move out, otherwise can not be reused
    public refresh(): void {
        this.repositorySubscription = this.repositoryService
            .findAll(true)
            .subscribe((repositories: RepositoriesModel) => this.data.repositories = repositories);
    }

    ngDestroy(): void {
        this.repositorySubscription.unsubscribe();
    }
}
