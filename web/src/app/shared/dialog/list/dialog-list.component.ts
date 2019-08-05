import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

// Dashboard hub services
import { RepositoryService } from '../../../core/services/index.service';
import { ProjectModel, RepositoriesModel } from '../../models/index.model';

@Component({
  selector: 'dashboard-dialog-list',
  templateUrl: './dialog-list.component.html',
})
export class DialogListComponent implements OnDestroy {

  private repositorySubscription: Subscription;

  constructor(
    private repositoryService: RepositoryService,
    public dialogRef: MatDialogRef<DialogListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: ProjectModel, repositories: RepositoriesModel }
  ) { }

  // @TODO: move out, otherwise can not be reused
  public refresh(): void {
    this.repositorySubscription = this.repositoryService
      .refresh()
      .subscribe((repositories: RepositoriesModel) => this.data.repositories = repositories);
  }

  ngOnDestroy(): void {
    if (this.repositorySubscription) {
      this.repositorySubscription.unsubscribe();
    }
  }
}
