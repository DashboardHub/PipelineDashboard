import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

// Third party modules
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

// Dashboard hub models and services
import { MatSnackBar } from '@angular/material';
import { MonitorService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitor-create-edit',
  templateUrl: './monitor-create-edit.component.html',
  styleUrls: ['./monitor-create-edit.component.scss'],
})
export class MonitorCreateEditComponent implements OnInit, OnDestroy {

  private monitorUid: string;
  private monitorsList: MonitorModel[] = [];
  private projectSubscription: Subscription;
  private saveMonitorSubscription: Subscription;
  private projectUid: string;
  public isEdit: Boolean = false;
  public monitorForm: FormGroup;
  public statusCodeList: Number[] = [200, 201, 204, 400, 401, 404, 500];

  constructor(
    private form: FormBuilder,
    private monitorService: MonitorService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle init method
   */
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.initializeMonitorForm();
    this.projectSubscription = this.route.data
      .subscribe((data: { project: ProjectModel }) => {
        const project: ProjectModel = data.project;
        this.monitorsList = project && project.monitors ? project.monitors : [];
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
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    if (this.saveMonitorSubscription) {
      this.saveMonitorSubscription.unsubscribe();
    }
  }

  /**
   * This function is used to add the monitor in the array
   */
  addMonitor(): void {
    this.monitorsList.push(this.monitorForm.value);
    this.saveMonitor(this.projectUid, this.monitorsList, this.monitorUid);
  }

  /**
   * To initialize monitor form
   */
  initializeMonitorForm(): void {
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
   * This function is used to save monitor and navigate to monitors list screen
   *
   * @param uid uid of monitor which needs to be added into monitors list
   * @param monitors monitors list to be updated
   *
   */
  saveMonitor(uid: string, monitors: MonitorModel[], monitorUid: string): void {
    if (monitorUid) {
      this.saveMonitorSubscription = this.monitorService.saveMonitors(uid, monitors)
        .pipe(
          take(1),
          switchMap(() => this.monitorService.pingMonitor(this.projectUid, this.monitorUid, 'automatic')))
        .subscribe(() => this.router.navigate([`/projects/${uid}/monitors`]),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    } else {
      this.saveMonitorSubscription = this.monitorService.saveMonitors(uid, monitors)
        .subscribe(() => this.router.navigate([`/projects/${uid}/monitors`]),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    }
  }

  /**
   * This function is used to update the monitor
   */
  updateMonitor(): void {
    const monitorsList: MonitorModel[] = this.monitorsList.filter((monitor: MonitorModel) => monitor.uid !== this.monitorUid);
    const currentMonitor: MonitorModel = this.monitorsList.find((monitor: MonitorModel) => this.monitorUid === monitor.uid);
    currentMonitor.name = this.monitorForm.get('name').value;
    currentMonitor.method = this.monitorForm.get('method').value;
    currentMonitor.path = this.monitorForm.get('path').value;
    currentMonitor.expectedCode = this.monitorForm.get('expectedCode').value;
    currentMonitor.expectedText = this.monitorForm.get('expectedText').value;
    monitorsList.push(currentMonitor);
    this.monitorsList = monitorsList;
    this.saveMonitor(this.projectUid, this.monitorsList, this.monitorUid);
  }
}
