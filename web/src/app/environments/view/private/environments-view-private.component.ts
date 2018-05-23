import { Component, OnInit } from '@angular/core';
import { Environment } from '../../environment.model';
import { Profile } from '../../../auth/profile';
import { EnvironmentService } from '../../environment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogConfirmationComponent } from '../../../dialog/confirmation/dialog-confirmation.component';

@Component({
  selector: 'qs-environments-view-private',
  templateUrl: './environments-view-private.component.html',
})
export class EnvironmentsViewPrivateComponent implements OnInit {

  public environment: Environment = new Environment();
  public profile: Profile = new Profile();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private environmentService: EnvironmentService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.environment = this.route.snapshot.data.environment;
  }

  refresh(): void {
    this.environmentService
      .findPrivateById(this.route.snapshot.params.id)
      .subscribe((environment: Environment) => this.environment = environment);
  }

  delete(): void {
    this.environmentService
      .deleteById(this.environment.id)
      .subscribe(() => this.router.navigate(['/environments/list']));
  }

  deleteDialog(): void {
    let dialogRef: MatDialogRef<DialogConfirmationComponent, boolean> = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: `Are you sure you want to delete the environment "${this.environment.title}"`,
      },
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.delete();
      }
    });
  }
}
