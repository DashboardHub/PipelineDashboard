import { Component } from '@angular/core';
import { Environment } from '../../environment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorForm } from '../monitor.form';
import { AbstractControl } from '@angular/forms';
import { MonitorService } from '../monitor.service';
import { Monitor } from '../monitor.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'qs-monitors-add',
  templateUrl: './monitors-add.component.html',
})
export class MonitorsAddComponent {

  public environment: Environment;
  public form: MonitorForm = new MonitorForm();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private monitorService: MonitorService) {
    this.environment = this.route.snapshot.data.environment;
  }

  submit(form: AbstractControl): void {
    this.monitorService
      .add(this.environment.id, form.value)
      .subscribe(
        (monitor: Monitor) => this.router.navigate(['/environments', this.environment.id, 'monitors', monitor.id]),
        (error: any) => this.snackBar.open(error.message, undefined, { duration: 5000 }),
      );
  }
}
