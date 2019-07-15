import { Component, OnInit } from '@angular/core';

// Rxjs operators
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Dashboard hub application model and services
import { AngularFireFunctions } from '@angular/fire/functions';
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

  constructor(
    private fns: AngularFireFunctions,
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
   * @param id the id of monitor which needs to be deleted
   */
  deleteMonitor(id: string): void {
    this.monitors = this.monitors.filter((monitor: MonitorModel) => monitor.uid !== id);
    this.monitorService.saveMonitor(this.projectUid, this.monitors);

    // When delete a monitor , deleting all its pings
    const callable: any = this.fns.httpsCallable('deletePings');
    return callable({ projectUid: this.projectUid, monitorUid: id });
  }

   // This function will ping the monitor
   public pingMonitor(monitorUid: string): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('pingMonitor');
    return callable({ projectUid: this.projectUid, monitorUid: monitorUid });
  }
}
