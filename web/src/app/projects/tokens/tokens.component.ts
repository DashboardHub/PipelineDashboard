import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

// Dashboard hub models
import { TokenModel, ProjectModel } from '../../shared/models/index.model';

// Dashboard hub services
import { AuthenticationService, TokenService, ProjectService } from '../../core/services/index.service';
import { DialogConfirmationComponent } from '../../shared/dialog/confirmation/dialog-confirmation.component';

@Component({
  selector: 'dashboard-tokens-tokens-view',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss'],
})

export class TokensProjectComponent implements OnInit {
  private tokenSubscription: Subscription;
  private deleteSubscription: Subscription;
  public token: TokenModel = new TokenModel();
  public tokens: TokenModel[] = [];
  public projectuid: string;

  public project: ProjectModel = new ProjectModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private authService: AuthenticationService,
    private projectService: ProjectService,
  ) {
    this.projectuid = this.route.snapshot.paramMap.get('uid');
    this.project.uid = this.route.snapshot.paramMap.get('uid');
    console.log("projectuid : " + this.projectuid);
  }

  ngOnInit(): void {
    console.log("projectuid : " + this.projectuid);
    this.tokenSubscription = this.tokenService
      .findOneByProjectId(this.projectuid)
      .subscribe((tokens: TokenModel[]) => this.tokens = tokens);
  }


  // This function add  the repository
  /* addToken(): void {
    this.dialog
      .open(DialogListComponent, {
        data: {
          token: this.token,
          tokens: this.token.tokens,
        },
      })
      .afterClosed()
      .pipe(
        filter(
          (selectedTokens: { value: string }[]) => !!selectedTokens)
      )
      .subscribe((selectedTokens: { value: string }[]) => {
        this.tokenService.saveTokens(
          this.token.uid,
          selectedTokens.map(
            (name: { value: string }) => name.value
          )
        );

        selectedTokens.forEach((name: { value: string }) =>
          this.repositoryService.loadRepository(name.value)
        );
      });
  } */



  // This function delete the token
  delete(uid): void {
    this.dialog.open(DialogConfirmationComponent, {
      height: '400px',
      width: '600px',
      data: {
        title: 'Delete Token',
        content: 'Are you you want to delete this token?'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.deleteSubscription = this.tokenService
          .delete(uid)
          .pipe(
            catchError(
              (error: any): any =>
                this.snackBar.open(error.message, undefined, {
                  duration: 5000,
                })
            )
          )
          .subscribe(() => {
            this.snackBar.open('Token has been deleted', undefined, {
              duration: 5000,
            })
          });
      }
    });
  }

  isAdmin(): boolean {
    return this.projectService.isAdmin(this.project);
  }

  ngDestroy(): void {
    this.tokenSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }
}
