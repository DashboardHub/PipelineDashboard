import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

// Third party modules
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Dashboard hub models and services
import { ProjectService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitor-create-edit',
  templateUrl: './monitor-create-edit.component.html',
  styleUrls: ['./monitor-create-edit.component.scss'],
})
export class MonitorCreateEditComponent implements OnInit {

  private createEditSubscription: Subscription;
  private projectSubscription: Subscription;

  private id: string;
  private monitorsList: MonitorModel[] = [];
  private uid: string;
  public isEdit: Boolean = false;
  public monitorForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle init method
   */
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.monitorForm = this.form.group({
      uid: uuid(),
      name: [undefined, [Validators.required, Validators.minLength(3)]],
      method: [undefined, Validators.required],
      path: [undefined, Validators.required],
      expectedCode: [undefined, Validators.required],
      expectedText: [undefined],
    });
    this.projectSubscription = this.projectService
      .findOneById(this.uid)
      .subscribe((project: ProjectModel) => {
        this.monitorsList = project.monitors ? project.monitors : [];
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
          this.isEdit = true;
          const filteredMonitor: MonitorModel[] = this.monitorsList.filter((monitor: MonitorModel) => {
            return monitor.uid === this.id;
          });
          this.monitorForm.reset(filteredMonitor[0]);
        }
      });
  }

  /**
   * Lifecycle destroy method
   */
  ngDestroy(): void {
    this.createEditSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

  /**
   * This function is used to add the monitor in the array
   */
  addMonitor(): void {
    this.monitorsList.push(this.monitorForm.value);
    this.saveMonitor(this.monitorsList);
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
    this.saveMonitor(this.monitorsList);
  }

  /**
   * @param monitors This function is used to save monitor into the database
   */
  saveMonitor(monitors: MonitorModel[]): void {
    this.createEditSubscription = this.projectService
      .saveMonitors(this.uid, monitors)
      .subscribe(
        () => this.router.navigate([`/projects/${this.uid}/monitors`]),
        (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
      );
  }
}
