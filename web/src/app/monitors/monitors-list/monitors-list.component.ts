import { Component, OnInit } from '@angular/core';

// Rxjs operators
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Dashboard hub application model and services
import { MonitorService, ProjectService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent implements OnInit {

  private projectSubscription: Subscription;
  private uid: string;
  public monitors: MonitorModel[] = [];

  constructor(
    private projectService: ProjectService,
    private monitorService: MonitorService,
    private route: ActivatedRoute
  ) { }

  /**
   * Lifecycle init method
   */
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.projectSubscription = this.projectService
      .findOneById(this.uid)
      .subscribe((project: ProjectModel) => {
        this.monitors = project.monitors ? project.monitors : [];
      });
  }

  /**
   * Lifecycle destroy method
   */
  ngDestroy(): void {
    this.projectSubscription.unsubscribe();
  }

  /**
   * This method is used to delete the monitor from list
   */
  deleteMonitor(id: string): void {
    this.monitors = this.monitors.filter((monitor: MonitorModel) => monitor.uid !== id);
    this.monitorService.saveMonitor(id, this.monitors);
  }
}
