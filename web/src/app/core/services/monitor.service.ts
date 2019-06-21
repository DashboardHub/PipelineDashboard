import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { MonitorModel, RepositoryModel } from '../../shared/models/index.model';
import { ActivityService } from './activity.service';
import { AuthenticationService } from './authentication.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private activityService: ActivityService,
    private repositoryService: RepositoryService
  ) {
  }

  // This function is for creating the project for logged in user
  public create(data: MonitorModel): Observable<MonitorModel> {
    let monitor: MonitorModel = {
      uid: uuid(),
      access: { admin: [this.authService.profile.uid] },
      ...data,
      repositories: [],
      createdOn: firebase.firestore.Timestamp.fromDate(new Date()),
      updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    return this.activityService
      .start()
      .pipe(
        tap(() => this.repositoryService.refresh()),
        switchMap(() => this.afs.collection<MonitorModel>('monitors').doc(monitor.uid).set(monitor)),
        map(() => monitor)
      );
  }

  // This function delete the project via uid
  public delete(uid: string): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<MonitorModel>('monitors').doc<MonitorModel>(uid).delete())
      );
  }

  // This function returns the public projects list
  public findPublicMonitors(): Observable<MonitorModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<MonitorModel>(
            'monitors',
            (ref: firebase.firestore.Query) => ref.where('type', '==', 'public')
              .orderBy('updatedOn', 'desc')
          )
          .valueChanges())
      );
  }

  // This function returns the private projects list
  public findMyMonitors(): Observable<MonitorModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<MonitorModel>(
            'monitors',
            (ref: firebase.firestore.Query) => ref.where('access.admin', 'array-contains', this.authService.profile.uid)
              .orderBy('updatedOn', 'desc')
          )
          .valueChanges())
      );
  }

  // This function returns the project details via id
  public findOneById(uid: string): Observable<MonitorModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<MonitorModel>('monitors').doc<MonitorModel>(uid).valueChanges())
      );
  }

  // check if has project access
  hasAccess(monitor: MonitorModel): boolean {
    return monitor.access.readonly && monitor.access.readonly.includes(this.authService.profile.uid);
  }

  // check if owner of the project
  isAdmin(monitor: MonitorModel): boolean {
    return monitor.access.admin.includes(this.authService.profile.uid);
  }

  // This function update the project details
  public save(monitor: MonitorModel): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<MonitorModel>('monitors')
          .doc<MonitorModel>(monitor.uid)
          .set({ ...monitor, updatedOn: firebase.firestore.Timestamp.fromDate(new Date()) }, { merge: true }))
      );
  }

  // This function add the repository in any project
  public saveRepositories(uid: string, repositories: string[]): Observable<void> {
    if (!repositories.length) {
      return this.activityService
        .start()
        .pipe(
          switchMap(() => this.afs
            .collection<MonitorModel>('monitors')
            .doc<MonitorModel>(uid)
            .set(
              {
                repositories: [],
                updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
              },
              { merge: true }))
        );
    }

    return this.activityService
      .start()
      .pipe(
        mergeMap(() => forkJoin(...repositories.map((repository: string) => this.repositoryService.loadRepository(repository)))),
        switchMap(() => this.afs
          .collection<MonitorModel>('monitors')
          .doc<MonitorModel>(uid)
          .set(
            {
              repositories: repositories.map((repoUid: string) => new RepositoryModel(repoUid).uid),
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true }))
      );
  }
}
