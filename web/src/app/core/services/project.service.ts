import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { IProject, RepositoryModel } from '../../shared/models/index.model';
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
  public create(data: IProject): Observable<IProject> {
    if (data.url) {
      // @TODO: move to model
      data.url = this.stripeSlash(data.url);
    }
    let project: IProject = {
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
        switchMap(() => this.afs.collection<IProject>('projects').doc(project.uid).set(project)),
        map(() => project),
        take(1)
      );
  }

  // This function delete the project via uid
  public delete(uid: string): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<IProject>('projects').doc<IProject>(uid).delete()),
        take(1)
      );
  }

  // This function returns the public projects list
  public findPublicProjects(): Observable<IProject[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>(
            'projects',
            (ref: firebase.firestore.Query) => ref.where('type', '==', 'public')
              .orderBy('updatedOn', 'desc')
          )
          .valueChanges())
      );
  }

  // This function returns the private projects list
  public findMyProjects(): Observable<IProject[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>(
            'projects',
            (ref: firebase.firestore.Query) => ref.where('access.admin', 'array-contains', this.authService.profile.uid)
              .orderBy('updatedOn', 'desc')
          )
          .valueChanges())
      );
  }

  // This function returns the project details via id
  public findOneById(uid: string): Observable<IProject> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<IProject>('projects').doc<IProject>(uid).valueChanges())
      );
  }

  // check if has project access
  hasAccess(project: IProject): boolean {
    return project.access.readonly && project.access.readonly.includes(this.authService.profile.uid);
  }

  // check if owner of the project
  isAdmin(project: IProject): boolean {
    return project.access.admin.includes(this.authService.profile.uid);
  }

  // This function update the project details
  public save(project: IProject): Observable<void> {
    if (project.url) {
      // @TODO: move to project model
      project.url = this.stripeSlash(project.url);
    }
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(project.uid)
          .set({ ...project, updatedOn: firebase.firestore.Timestamp.fromDate(new Date()) }, { merge: true })),
        take(1)
      );
  }

  // This function add the repository in any project
  public saveRepositories(uid: string, repositories: string[]): Observable<void> {
    if (!repositories.length) {
      return this.activityService
        .start()
        .pipe(
          switchMap(() => this.afs
            .collection<IProject>('projects')
            .doc<IProject>(uid)
            .set(
              {
                repositories: [],
                updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
              },
              { merge: true })),
          take(1)
        );
    }

    return this.activityService
      .start()
      .pipe(
        mergeMap(() => forkJoin(...repositories.map((repository: string) => this.repositoryService.loadRepository(repository)))),
        switchMap(() => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(uid)
          .set(
            {
              repositories: repositories.map((repoUid: string) => new RepositoryModel(repoUid).uid),
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true })),
        take(1)
      );
  }

  /**
   * This function stripes the trailing slash from url
   * @param url the url address
   * @return the url after stripe of the trailing slash
   */
  stripeSlash(url: string): string {
    if (url.endsWith('/')) {
      const index: number = url.lastIndexOf('\/');
      url = url.substring(0, index);
    }
    return url;
  }
}
