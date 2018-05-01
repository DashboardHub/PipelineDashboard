import { Component } from '@angular/core';
import { EnvironmentsAddForm } from './environments-add.form';
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
  public form: EnvironmentsAddForm = new EnvironmentsAddForm();

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
        (environment: Environment) => this.router.navigate(['/environments', environment.id, 'view']),
        (error) => this.snackBar.open(error.message, null, { duration: 5000 })
      );
  }

}
