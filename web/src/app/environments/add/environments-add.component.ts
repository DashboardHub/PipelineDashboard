import { Component } from '@angular/core';
import { EnvironmentForm } from '../environment.form';
import { EnvironmentService } from '../environment.service';
import { AbstractControl } from '@angular/forms';
import { Environment } from '../environment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'qs-environments-add',
  templateUrl: './environments-add.component.html',
})
export class EnvironmentsAddComponent {

  public environment: Environment;
  public form: EnvironmentForm = new EnvironmentForm();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private environmentService: EnvironmentService,
  ) {
    this.environment = this.route.snapshot.data.environment;
  }

  submit(form: AbstractControl): void {
    this.environmentService
      .add(form.value)
      .subscribe(
        (environment: Environment) => this.router.navigate(['/environments', environment.id]),
        (error: any) => this.snackBar.open(error.message, undefined, { duration: 5000 }),
      );
  }

}
