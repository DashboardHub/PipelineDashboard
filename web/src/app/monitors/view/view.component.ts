import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

// DashboardHub
import { AuthenticationService, MonitorService } from '../../core/services/index.service';
import { DialogListComponent } from '../../sharedmonitor/dialog/list/dialog-list.component';
import { MonitorModel } from '../../sharedmonitor/models/index.model';

@Component({
  selector: 'dashboard-monitors-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})

export class ViewMonitorComponent implements OnInit {
  private monitorSubscription: Subscription;
  private deleteSubscription: Subscription;
  public monitor: MonitorModel = new MonitorModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private monitorService: MonitorService,
    private authService: AuthenticationService
  ) {
    this.monitor.uid = this.route.snapshot.paramMap.get('uid');
  }

  ngOnInit(): void {
    this.monitorSubscription = this.monitorService
      .findOneById(this.route.snapshot.params.uid)
      .subscribe((monitor: MonitorModel) => this.monitor = monitor);
  }

  // This function add  the repository
  addRepository(): void {
    this.dialog
      .open(DialogListComponent, {
        data: {
          monitor: this.monitor,
          repositories: this.authService.profile.repositories,
        },
      })
      .afterClosed()
      .pipe(
        filter((selectedRepositories: { value: string }[]) => !!selectedRepositories),
        switchMap((selectedRepositories: { value: string }[]) => this.monitorService.saveRepositories(
          this.monitor.uid,
          selectedRepositories.map((fullName: { value: string }) => fullName.value)
        ))
      )
      .subscribe(() => true);
  }
  
  // This function add  the repository
  monitors(): void {
    this.dialog
      .open(DialogListComponent, {
        data: {
          monitor: this.monitor,
          repositories: this.authService.profile.repositories,
        },
      })
      .afterClosed()
      .pipe(
        filter((selectedRepositories: { value: string }[]) => !!selectedRepositories),
        switchMap((selectedRepositories: { value: string }[]) => this.monitorService.saveRepositories(
          this.monitor.uid,
          selectedRepositories.map((fullName: { value: string }) => fullName.value)
        ))
      )
      .subscribe(() => true);
  }

  // This function delete the project
  delete(): void {
    this.deleteSubscription = this.monitorService
      .delete(this.monitor.uid)
      .subscribe(() => this.router.navigate(['/monitors']));
  }

  // This function check if logged in user is also owner of the project
  isAdmin(): boolean {
    return this.monitorService.isAdmin(this.monitor);
  }

  ngDestroy(): void {
    this.monitorSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }
}
