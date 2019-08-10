import { Component, OnDestroy, OnInit } from '@angular/core';

// Rxjs operators
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// Dashboard hub application model and services
import { MatSnackBar } from '@angular/material';
import { MonitorService, ProjectService } from '../../core/services/index.service';
import { IProject, MonitorModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent implements OnInit, OnDestroy {

  private monitorSubscription: Subscription;
  private saveMonitorSubscription: Subscription;
  public monitors: MonitorModel[] = [];
  public project: IProject;
  public projectUid: string;
  public manualPing: boolean = false;

  constructor(
    private monitorService: MonitorService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.route.data
      .pipe(
        map((data: { project: IProject }) => data.project)
      )
      .subscribe((project: IProject) => {
        this.project = project;
        this.monitors = project.monitors ? project.monitors : [];
      });

    this.monitorSubscription = this.projectService
      .findOneById(this.projectUid)
      .subscribe((projects: IProject) => this.monitors = projects.monitors ? projects.monitors : []);
  }

  /**
   * This method is used to delete the monitor from list
   *
   * @param uid the uid of monitor which needs to be deleted
   */
  deleteMonitor(monitorUid: string): void {
    this.monitors = this.monitors.filter((monitor: MonitorModel) => monitor.uid !== monitorUid);
    this.saveMonitorSubscription = this.monitorService.saveMonitors(this.projectUid, this.monitors)
      .subscribe(
        () => this.router.navigate([`/projects/${this.projectUid}/monitors`]),
        (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
      );

    // When delete a monitor , deleting all its pings
    this.monitorService
      .deletePingsByMonitor(this.projectUid, monitorUid);
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
