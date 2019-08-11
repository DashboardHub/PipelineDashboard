// Angular modules
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

// Third party modules
import { map, take } from 'rxjs/operators';

// Dashboard model and services
import { ProjectTokenService } from '../../core/services/index.service';
import { DialogConfirmationComponent } from '../../shared/dialog/confirmation/dialog-confirmation.component';
import { ProjectTokenModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-project-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.scss'],
})
export class TokensListComponent {

  private dialogRef: MatDialogRef<DialogConfirmationComponent>;
  public projectUid: string;
  public tokenList: ProjectTokenModel[];

  constructor(
    private dialog: MatDialog,
    private projectTokenService: ProjectTokenService,
    private route: ActivatedRoute
  ) {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.route.data
      .pipe(
        map((data: { tokens: ProjectTokenModel[] }) => data.tokens),
        take(1)
      )
      .subscribe((data: ProjectTokenModel[]) => this.tokenList = data);
  }

  // This function delete the project token
  delete(token: ProjectTokenModel): void {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig = {
      width: '500px',
      data: {
        title: 'Delete Token',
        content: 'Are you sure you want to delete?',
      },
    };
    this.dialogRef = this.dialog.open(DialogConfirmationComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.projectTokenService
          .delete(this.projectUid, token.uid)
          .pipe(
            take(1)
          )
          .subscribe(() => {
            this.projectTokenService.findAll(this.projectUid)
              .pipe(
                take(1)
              )
              .subscribe((data: ProjectTokenModel[]) => this.tokenList = data);
          });
      }
  });
 }
}
