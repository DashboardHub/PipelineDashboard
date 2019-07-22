import { Component, OnDestroy, OnInit } from '@angular/core';

// Rxjs operators
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Dashboard hub application model and services
import { MonitorService, ProjectService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent implements OnInit, OnDestroy {

  private monitorSubscription: Subscription;
  public monitors: MonitorModel[] = [];
  public projectUid: string;
  public manualPing: boolean = false;

  constructor(
    private monitorService: MonitorService,
    private projectService: ProjectService,
    private route: ActivatedRoute
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
      .subscribe((project: ProjectModel) => this.monitors = project.monitors ? project.monitors : []);

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
    this.monitors = this.monitors.filter((monitor: MonitorModel) => monitor.uid !== monitorUid);
    this.monitorService.saveMonitor(this.projectUid, this.monitors);

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
  }
}
