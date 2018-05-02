import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentForm } from '../environment.form';
import { Environment } from '../environment.model';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'qs-environments-edit',
  templateUrl: './environments-edit.component.html',
})
export class EnvironmentsEditComponent implements OnInit {
  public environment: Environment = new Environment();
  public form: EnvironmentForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private environmentService: EnvironmentService
  )
  {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    this.form = new EnvironmentForm(this.environment);
  }

  submit(form: AbstractControl): void {
    this.environmentService
      .update(this.environment.id, form.value)
      .subscribe(
        (environment: Environment) => this.router.navigate(['/environments', environment.id]),
        (error) => this.snackBar.open(error.message, null, { duration: 5000 })
      );
  }
}
