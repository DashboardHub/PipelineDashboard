// Core components
import { Injectable } from '@angular/core';

// Firestore modules
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as firebase from 'firebase';

// Rxjs operators
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

// DashboardHub models and services
import { IMonitor, IProject, ModelFactory, MonitorModel, ProjectModel } from '@shared/models/index.model';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {

  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
    private projectService: ProjectService
  ) {
  }

  /**
   * This function is used to save monitors in the database
   *
   * @param projectUid uid of project
   * @param monitor monitor to save
   * @returns the observable
   */
  public save(projectUid: string, monitor: MonitorModel): Observable<void> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        take(1),
        tap(() => this.pingMonitor(projectUid, monitor.uid, 'automatic')),
        map((project: ProjectModel) => {
          const monitors: MonitorModel[] = project.monitors;

          if (monitors.find((monitorModel: MonitorModel) => monitorModel.uid === monitor.uid)) {
            return project.monitors.map((monitorModel: MonitorModel) => {
              if (monitorModel.uid === monitor.uid) {
                return new MonitorModel({ ...monitorModel.toData(), ...monitor.toData(true) });
              }
              return monitorModel;
            });
          }

          return project.monitors.concat(monitor);
        }),
        switchMap((monitors: MonitorModel[]) => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(projectUid)
          .set(
            {
              monitors: ModelFactory.fromModels<MonitorModel, IMonitor>(monitors),
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true }))
      );
  }

  public delete(projectUid: string, monitorUid: string): Observable<void> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        take(1),
        switchMap((project: ProjectModel) => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(projectUid)
          .set(
            {
              monitors: ModelFactory
                .fromModels<MonitorModel, IMonitor>(project.monitors.filter((monitorModel: MonitorModel) => monitorModel.uid !== monitorUid)),
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true }))
      );
  }

  public deletePingsByMonitor(projectUid: string, monitorUid: string): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('deletePingsByMonitor');
    return callable({ projectUid, monitorUid });
  }

  public pingMonitor(projectUid: string, monitorUid: string, type: string): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('pingMonitor');
    return callable({ projectUid, monitorUid, type });
  }
}
