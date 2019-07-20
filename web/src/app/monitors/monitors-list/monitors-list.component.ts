import { Component, OnInit } from '@angular/core';

// Rxjs operators
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';

// Dashboard hub application model and services
import { MonitorService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent implements OnInit {

  public monitors: MonitorModel[] = [];
  public projectUid: string;
  public manualPing: boolean = false;

  constructor(
    private monitorService: MonitorService,
    private route: ActivatedRoute
  ) { }

  /**
   * Lifecycle init method
   */
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.route.data
      .pipe(
        map((data: { project: ProjectModel }) => data.project),
        take(1)
      )
      .subscribe((project: ProjectModel) => this.monitors = project.monitors ? project.monitors : []);
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
}
