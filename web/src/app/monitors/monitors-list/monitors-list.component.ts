import { Component, OnInit } from '@angular/core';

// Rxjs operators
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

// Dashboard hub application model and services
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthenticationService, MonitorService, ProjectService } from '../../core/services/index.service';
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
    private authService: AuthenticationService,
    private fns: AngularFireFunctions,
    private projectService: ProjectService,
    private monitorService: MonitorService,
    private route: ActivatedRoute
  ) { }

  /**
   * Lifecycle init method
   */
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('projectUid');
    this.projectSubscription = this.projectService
      .findOneById(this.uid)
      .subscribe((project: ProjectModel) => this.monitors = project.monitors ? project.monitors : []);
  }

  /**
   * Lifecycle destroy method
   */
  ngDestroy(): void {
    this.projectSubscription.unsubscribe();
  }

  /**
   * This method is used to delete the monitor from list
   *
   * @param id the id of monitor which needs to be deleted
   */
  deleteMonitor(id: string): void {
    this.monitors = this.monitors.filter((monitor: MonitorModel) => monitor.uid !== id);
    this.monitorService.saveMonitor(id, this.monitors);
  }

   // This function will ping the monitor
   public pingMonitor(monitorUid: string): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('pingMonitor');
    return callable({ token: this.authService.profile.oauth.githubToken, projectUid: this.uid, monitorUid: monitorUid });
  }
}
