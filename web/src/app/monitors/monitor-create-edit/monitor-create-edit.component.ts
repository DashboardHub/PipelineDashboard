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

  private monitorUid: string;
  private monitorsList: MonitorModel[] = [];
  private projectSubscription: Subscription;
  private projectUid: string;
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
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.intializeMonitorForm();
    this.projectSubscription = this.projectService
      .findOneById(this.projectUid)
      .subscribe((project: ProjectModel) => {
        this.monitorsList = project.monitors ? project.monitors : [];
        this.monitorUid = this.route.snapshot.paramMap.get('monitorUid');
        if (this.monitorUid) {
          this.isEdit = true;
          const filteredMonitor: MonitorModel = this.monitorService.findMonitorById(this.monitorsList, this.monitorUid);
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
    this.monitorService.saveMonitor(this.projectUid, this.monitorsList);
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
    this.monitorsList = this.monitorsList.filter((monitor: MonitorModel) => monitor.uid !== this.monitorUid);
    this.monitorsList.push(this.monitorForm.value);
    this.monitorService.saveMonitor(this.projectUid, this.monitorsList);
    }
}