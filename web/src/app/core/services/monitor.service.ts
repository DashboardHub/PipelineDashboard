// Core components
import { Injectable } from '@angular/core';

// Firestore modules
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as firebase from 'firebase';

// Rxjs operators
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

// Dashboard hub models and services
import { IProject, MonitorModel } from '../../shared/models/index.model';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {

  constructor(
    private afs: AngularFirestore,
    private activityService: ActivityService,
    private fns: AngularFireFunctions
  ) {
  }

  /**
   * This function will return the monitor by id
   *
   * @param monitors monitors list
   * @param id id of monitor which needs to be find
   * @returns the monitor
   */
  findMonitorById(monitors: MonitorModel[], id: string): MonitorModel {
    return monitors.find((monitor: MonitorModel) => monitor.uid === id);
  }

  /**
   * This function is used to save monitors in the database
   *
   * @param uid uid of monitor which needs to be save
   * @param monitors monitors list
   * @returns the observable
   */
  public saveMonitors(uid: string, monitors: MonitorModel[]): Observable<void> {
    if (!monitors.length) {
      return this.activityService
        .start()
        .pipe(
          take(1),
          switchMap(() => this.afs
            .collection<IProject>('projects')
            .doc<IProject>(uid)
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
        take(1),
        switchMap(() => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(uid)
          .set(
            {
              monitors: monitors,
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true }))
      );
  }

  public deletePingsByMonitor(projectUid: string, monitorUid: string): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('deletePingsByMonitor');
    return callable({ projectUid, monitorUid });
  }

  public pingMonitor(projectUid: string, monitorUid: string): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('pingMonitor');
    const type: string = 'manual';
    return callable({ projectUid, monitorUid, type });
  }
}
