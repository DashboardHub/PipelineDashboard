import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar } from '@angular/material';

// Rxjs operators
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// Dashboard hub application model and services
import { MonitorService, ProjectService } from '../../core/services/index.service';
import { DialogConfirmationComponent } from '../../shared/dialog/confirmation/dialog-confirmation.component';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent implements OnInit, OnDestroy {

  private dialogRef: MatDialogRef<DialogConfirmationComponent>;
  private monitorSubscription: Subscription;
  private saveMonitorSubscription: Subscription;
  public monitors: MonitorModel[] = [];
  public project: ProjectModel;
  public projectUid: string;
  public manualPing: boolean = false;

  constructor(
    private dialog: MatDialog,
    private monitorService: MonitorService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.route.data
      .pipe(
        map((data: { project: ProjectModel }) => data.project)
      )
      .subscribe((project: ProjectModel) => {
        this.project = project;
        this.monitors = project.monitors ? project.monitors : [];
      });

    this.monitorSubscription = this.projectService
      .findOneById(this.projectUid)
      .subscribe((projects: ProjectModel) => this.monitors = projects.monitors ? projects.monitors : []);
  }

  /**
   * This method is used to delete the monitor from list
   *
   * @param uid the uid of monitor which needs to be deleted
   */
  deleteMonitor(monitorUid: string): void {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig = {
      width: '500px',
      data: {
        title: 'Delete Monitor',
        content: 'Are you sure you want to delete?',
      },
    };
    this.dialogRef = this.dialog.open(DialogConfirmationComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.monitors = this.monitors.filter((monitor: MonitorModel) => monitor.uid !== monitorUid);
          this.saveMonitorSubscription = this.monitorService.saveMonitors(this.projectUid, this.monitors)
            .subscribe(
              () => this.monitorService.deletePingsByMonitor(this.projectUid, monitorUid),
              (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
            );
        }
      });
  }

  // This function will ping the monitor
  public pingMonitor(monitorUid: string): void {
    this.manualPing = true;
    this.monitorService
      .pingMonitor(this.projectUid, monitorUid);

    // disable the ping button for 1 second
    setTimeout(() => this.manualPing = false, 10000);
  }

  /**
   * Life cycle On destroy method
   */
  ngOnDestroy(): void {
    this.monitorSubscription.unsubscribe();
    if (this.saveMonitorSubscription) {
      this.saveMonitorSubscription.unsubscribe();
    }
  }
}
