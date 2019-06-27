import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { MonitorModel, ProjectModel, RepositoryModel } from '../../shared/models/index.model';
import { ActivityService } from './activity.service';
import { AuthenticationService } from './authentication.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private activityService: ActivityService,
    private repositoryService: RepositoryService
  ) {
  }

  // This function is for creating the project for logged in user
  public create(data: ProjectModel): Observable<ProjectModel> {
    let project: ProjectModel = {
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
        switchMap(() => this.afs.collection<ProjectModel>('projects').doc(project.uid).set(project)),
        map(() => project)
      );
  }

  // This function delete the project via uid
  public delete(uid: string): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<ProjectModel>('projects').doc<ProjectModel>(uid).delete())
      );
  }

  // This function returns the public projects list
  public findPublicProjects(): Observable<ProjectModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<ProjectModel>(
            'projects',
            (ref: firebase.firestore.Query) => ref.where('type', '==', 'public')
              .orderBy('updatedOn', 'desc')
          )
          .valueChanges())
      );
  }

  // This function returns the private projects list
  public findMyProjects(): Observable<ProjectModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<ProjectModel>(
            'projects',
            (ref: firebase.firestore.Query) => ref.where('access.admin', 'array-contains', this.authService.profile.uid)
              .orderBy('updatedOn', 'desc')
          )
          .valueChanges())
      );
  }

  // This function returns the project details via id
  public findOneById(uid: string): Observable<ProjectModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<ProjectModel>('projects').doc<ProjectModel>(uid).valueChanges())
      );
  }

  // check if has project access
  hasAccess(project: ProjectModel): boolean {
    return project.access.readonly && project.access.readonly.includes(this.authService.profile.uid);
  }

  // check if owner of the project
  isAdmin(project: ProjectModel): boolean {
    return project.access.admin.includes(this.authService.profile.uid);
  }

  // This function update the project details
  public save(project: ProjectModel): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<ProjectModel>('projects')
          .doc<ProjectModel>(project.uid)
          .set({ ...project, updatedOn: firebase.firestore.Timestamp.fromDate(new Date()) }, { merge: true }))
      );
  }

  // This function add the repository in any project
  public saveRepositories(uid: string, repositories: string[]): Observable<void> {
    if (!repositories.length) {
      return this.activityService
        .start()
        .pipe(
          switchMap(() => this.afs
            .collection<ProjectModel>('projects')
            .doc<ProjectModel>(uid)
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
          .collection<ProjectModel>('projects')
          .doc<ProjectModel>(uid)
          .set(
            {
              repositories: repositories.map((repoUid: string) => new RepositoryModel(repoUid).uid),
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true }))
      );
  }

   // This function add the repository in any project
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
