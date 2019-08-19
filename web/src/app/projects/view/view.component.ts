import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Thid party modules
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

// DashboardHub
import { AuthenticationService, ProjectService } from '../../core/services/index.service';
import { DialogConfirmationComponent } from '../../shared/dialog/confirmation/dialog-confirmation.component';
import { DialogListComponent } from '../../shared/dialog/list/dialog-list.component';
import { IProject, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-projects-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})

export class ViewProjectComponent implements OnInit, OnDestroy {

  private dialogRef: MatDialogRef<DialogConfirmationComponent>;
  private deleteSubscription: Subscription;
  private projectSubscription: Subscription;

  public project: ProjectModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private authService: AuthenticationService
  ) {
    this.project = new ProjectModel({ uid: this.route.snapshot.paramMap.get('projectUid') });
  }

  ngOnInit(): void {
    this.projectSubscription = this.projectService
      .findOneById(this.route.snapshot.params.projectUid)
      .subscribe((project: IProject) => this.project = new ProjectModel(project));
  }

  // This function add  the repository
  addRepository(): void {
    this.dialog
      .open(DialogListComponent, {
        data: {
          project: this.project,
          repositories: this.authService.profile.repositories,
        },
      })
      .afterClosed()
      .pipe(
        filter((selectedRepositories: { value: string }[]) => !!selectedRepositories),
        switchMap((selectedRepositories: { value: string }[]) => this.projectService.saveRepositories(
          this.project,
          selectedRepositories.map((fullName: { value: string }) => fullName.value)
        ))
      )
      .subscribe(() => true);
  }

  // This function delete the project
  delete(): void {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig = {
      width: '500px',
      data: {
        title: 'Delete Project',
        content: 'Are you sure you want to delete?',
      },
    };
    this.dialogRef = this.dialog.open(DialogConfirmationComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.projectSubscription.unsubscribe();
          this.deleteSubscription = this.projectService
            .delete(this.project.uid)
            .subscribe(() => this.router.navigate(['/projects']));
        }
      });
  }

  // This function check if logged in user is also owner of the project
  isAdmin(): boolean {
    return this.projectService.isAdmin(this.project);
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
