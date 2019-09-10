import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

// Dashboard hub services
import { ProjectModel, RepositoriesModel } from '../../models/index.model';

@Component({
  selector: 'dashboard-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss'],
})
export class DialogListComponent implements OnDestroy {

  private repositorySubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: ProjectModel, repositories: RepositoriesModel }
  ) { }

  ngOnDestroy(): void {
    if (this.repositorySubscription) {
      this.repositorySubscription.unsubscribe();
    }
  }
}
