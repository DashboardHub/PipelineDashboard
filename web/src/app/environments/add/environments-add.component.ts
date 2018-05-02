import { Component } from '@angular/core';
import { EnvironmentForm } from '../environment.form';
import { EnvironmentService } from '../environment.service';
import { AbstractControl } from '@angular/forms';
import { Environment } from '../environment.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'qs-environments-add',
  templateUrl: './environments-add.component.html',
})
export class EnvironmentsAddComponent {
  public form: EnvironmentForm = new EnvironmentForm();

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private environmentService: EnvironmentService
  )
  {
  }

  submit(form: AbstractControl): void {
    this.environmentService
      .add(form.value)
      .subscribe(
        (environment: Environment) => this.router.navigate(['/environments', environment.id]),
        (error) => this.snackBar.open(error.message, null, { duration: 5000 })
      );
  }

}
