import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RepositoryService } from '../../../services/repository.service';
import { Subscription } from 'rxjs';
import { ProjectModel, RepositoriesModel } from 'src/models/index.model';

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

    public refresh(): void {
        this.repositoryService
            .findAll(true)
            .subscribe((repositories: RepositoriesModel) => this.data.repositories = repositories);
    }

    ngDestroy(): void {
        this.repositorySubscription.unsubscribe();
    }
}
