// Angular modules
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

// Third party modules
import { map, take } from 'rxjs/operators';

// Dashboard model and services
import { TokenService } from '@core/services/index.service';
import { DialogConfirmationComponent } from '@shared/dialog/confirmation/dialog-confirmation.component';
import { ProjectModel, TokenModel } from '@shared/models/index.model';

/**
 * Token list component
 */
@Component({
  selector: 'dashboard-project-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.scss'],
})
export class TokensListComponent {

  private dialogRef: MatDialogRef<DialogConfirmationComponent>;
  public projectUid: string;
  public project: ProjectModel;
  public tokenList: TokenModel[];
  public typeIcon: string;
  public displayedColumns: string[] = ['name', 'action'];

  /**
   * Life cycle method
   * @param dialog MatDialog
   * @param tokenService TokenService
   * @param route ActivatedRoute
   */
  constructor(
    private dialog: MatDialog,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.route.data
      .pipe(
        map((data: { tokens: TokenModel[], project: ProjectModel }) => data),
        take(1)
      )
      .subscribe((data: { tokens: TokenModel[], project: ProjectModel }) => {
        this.tokenList = data.tokens;
        this.project = data.project;
        if (this.project.type === 'private') {
          this.typeIcon = 'lock';
        } else if (this.project.type === 'public') {
          this.typeIcon = 'lock_open';
        }
      });
  }

  /**
   * Delete the project token
   * @param tokenUid uid of token to be deleted
   */
  delete(tokenUid: string): void {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig = {
      width: '500px',
      data: {
        title: 'Delete Token',
        content: 'Are you sure you want to delete?',
      },
    };
    this.dialogRef = this.dialog.open(DialogConfirmationComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.tokenService
            .delete(this.projectUid, tokenUid)
            .subscribe((tokens: TokenModel[]) => this.tokenList = tokens);
        }
      });
  }
}
