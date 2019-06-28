// Core components
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

// Firestore modules
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

// Rxjs operators
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Dashboard hub models and services
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {

  constructor(
    private afs: AngularFirestore,
    private activityService: ActivityService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  /**
   *
   * @param monitors This function will return the monitor by id
   * @param id
   */
  findMonitorById(monitors: MonitorModel[], id: string): MonitorModel {
    return monitors.filter((monitor: MonitorModel) => {
      return monitor.uid === id;
    })[0];
  }

  /**
   * @param monitors This function is used to save monitor and navigate to monitors list
   */
  saveMonitor(uid: string, monitors: MonitorModel[]): void {
    this.saveMonitors(uid, monitors)
      .subscribe(
        () => this.router.navigate([`/projects/${uid}/monitors`]),
        (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
      );
  }

  /**
   *
   * @param uid This function is used to save monitors in the database
   * @param monitors
   */
  public saveMonitors(uid: string, monitors: MonitorModel[]): Observable<void> {
    if (!monitors.length) {
      return this.activityService
        .start()
        .pipe(
          switchMap(() => this.afs
            .collection<ProjectModel>('projects')
            .doc<ProjectModel>(uid)
            .set(
              {
                monitors: [],
                updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
              },
              { merge: true }))
        );
    }

    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<ProjectModel>('projects')
          .doc<ProjectModel>(uid)
          .set(
            {
              monitors: monitors,
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true }))
      );
  }
}
