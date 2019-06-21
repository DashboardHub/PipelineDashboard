import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Rxjs components
import { Subscription } from 'rxjs';

// Dashboard hub services and models
import { MonitorService } from '../../core/services/index.service';
import { MonitorModel } from '../../sharedmonitor/models/index.model';

@Component({
  selector: 'dashboard-monitors-create',
  templateUrl: './create-edit.component.html',
})
export class CreateEditMonitorComponent implements OnInit {

  private createEditSubscription: Subscription;
  private monitorSubscription: Subscription;
  private uid: string;
  public isEdit: Boolean = false;
  public monitorForm: FormGroup;

  constructor(
    private router: Router,
    private form: FormBuilder,
    private snackBar: MatSnackBar,
    private monitorService: MonitorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.monitorForm = this.form.group({
      type: [undefined, [Validators.required]],
      title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      description: [undefined, [Validators.minLength(3), Validators.maxLength(1024)]],
    });
    if (this.uid) {
      this.isEdit = true;
      this.monitorSubscription = this.route.data
        .subscribe((data: { monitor: MonitorModel }) => this.monitorForm.reset(data.monitor));
    }
  }

  // This function will create project and edit project details based upon if click on edit or add
  save(): void {
    if (this.uid) {
      this.createEditSubscription = this.monitorService
        .save({ uid: this.uid, ...this.monitorForm.getRawValue() })
        .subscribe(
          () => this.router.navigate(['/monitors', this.uid]),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    } else {
      this.createEditSubscription = this.monitorService
        .create(this.monitorForm.getRawValue())
        .subscribe(
          (monitor: MonitorModel) => this.router.navigate(['/monitors', monitor.uid]),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    }
  }

  ngDestroy(): void {
    this.createEditSubscription.unsubscribe();
    this.monitorSubscription.unsubscribe();
  }
}
