import { Component, OnInit } from '@angular/core';

// Rxjs operators
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Dashboard hub application model and services
import { MatSnackBar } from '@angular/material';
import { ProjectService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent implements OnInit {

  private projectSubscription: Subscription;
  private deleteSubscription: Subscription;
  private project: ProjectModel;
  private uid: string;
  public monitors: MonitorModel[] = [];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle init method
   */
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.projectSubscription = this.projectService
      .findOneById(this.uid)
      .subscribe((project: ProjectModel) => {
        this.project = project;
        this.monitors = project.monitors ? project.monitors : [];
      });
  }

  /**
   * Lifecycle destroy method
   */
  ngDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  /**
   * This method is used to navigate on edit monitor screen
   */
  editMonitor(id: string): void {
    this.router.navigate([`/projects/${this.uid}/monitors/${id}`]);
  }

  /**
   * This method is used to delete the monitor from list
   */
  deleteMonitor(id: string): void {
    const objIndex: number = this.monitors.findIndex((monitor: MonitorModel) => monitor.uid === id);
    this.monitors = [
      ...this.monitors.slice(0, objIndex),
      ...this.monitors.slice(objIndex + 1),
    ];
    this.deleteSubscription = this.projectService
      .saveMonitors(this.uid, this.monitors)
      .subscribe(
        () => this.router.navigate([`/projects/${this.uid}/monitors`]),
        (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
      );
  }
}
