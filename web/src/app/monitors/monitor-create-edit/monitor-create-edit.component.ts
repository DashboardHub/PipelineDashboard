import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

// Third party modules
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Dashboard hub models and services
import { MonitorService, ProjectService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitor-create-edit',
  templateUrl: './monitor-create-edit.component.html',
  styleUrls: ['./monitor-create-edit.component.scss'],
})
export class MonitorCreateEditComponent implements OnInit {

  private id: string;
  private monitorsList: MonitorModel[] = [];
  private projectSubscription: Subscription;
  private uid: string;
  public isEdit: Boolean = false;
  public monitorForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private monitorService: MonitorService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  /**
   * Lifecycle init method
   */
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.intializeMonitorForm();
    this.projectSubscription = this.projectService
      .findOneById(this.uid)
      .subscribe((project: ProjectModel) => {
        this.monitorsList = project.monitors ? project.monitors : [];
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
          this.isEdit = true;
          const filteredMonitor: MonitorModel = this.monitorService.findMonitorById(this.monitorsList, this.id);
          this.monitorForm.reset(filteredMonitor);
        }
      });
  }

  /**
   * Lifecycle destroy method
   */
  ngDestroy(): void {
    this.projectSubscription.unsubscribe();
  }

  /**
   * This function is used to add the monitor in the array
   */
  addMonitor(): void {
    this.monitorsList.push(this.monitorForm.value);
    this.monitorService.saveMonitor(this.uid, this.monitorsList);
  }

  intializeMonitorForm(): void {
    this.monitorForm = this.form.group({
      uid: uuid(),
      name: [undefined, [Validators.required, Validators.minLength(3)]],
      method: [undefined, Validators.required],
      path: [undefined, Validators.required],
      expectedCode: [undefined, Validators.required],
      expectedText: [undefined],
    });
  }

  /**
   * This function is used to update the monitor
   */
  updateMonitor(): void {
    const objIndex: number = this.monitorsList.findIndex((monitor: MonitorModel) => monitor.uid === this.id);
    this.monitorsList = [
      ...this.monitorsList.slice(0, objIndex),
      this.monitorForm.value,
      ...this.monitorsList.slice(objIndex + 1),
    ];
    this.monitorService.saveMonitor(this.uid, this.monitorsList);
  }
}
