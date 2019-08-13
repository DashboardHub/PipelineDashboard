import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { IProject, ProjectModel, RepositoryModel } from '../../shared/models/index.model';
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
  public create(data: IProject): Observable<ProjectModel> {
    const project: ProjectModel = new ProjectModel(
      {
        uid: uuid(), ...data,
        access: { admin: [this.authService.profile.uid] },
        createdOn: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
      }
    );

    return this.activityService
      .start()
      .pipe(
        tap(() => this.repositoryService.refresh()),
        switchMap(() => this.afs.collection<IProject>('projects').doc(project.uid).set(project.toData())),
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
  public findPublicProjects(): Observable<ProjectModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>(
            'projects',
            (ref: firebase.firestore.Query) => ref.where('type', '==', 'public')
              .orderBy('updatedOn', 'desc')
          )
          .valueChanges()),
        map((projects: IProject[]) => projects.map((project: IProject) => new ProjectModel(project)))
      );
  }

  // This function returns the private projects list
  public findMyProjects(): Observable<ProjectModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>(
            'projects',
            (ref: firebase.firestore.Query) => ref.where('access.admin', 'array-contains', this.authService.profile.uid)
              .orderBy('updatedOn', 'desc')
          )
          .valueChanges()),
          map((projects: IProject[]) => projects.map((project: IProject) => new ProjectModel(project)))
      );
  }

  // This function returns the project details via id
  public findOneById(uid: string): Observable<ProjectModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<IProject>('projects').doc<IProject>(uid).valueChanges()),
        map((project: IProject) => new ProjectModel(project))
      );
  }

  // This function update the project details
  public save(project: IProject): Observable<void> {
    const projectModel: ProjectModel = new ProjectModel(project);

    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(project.uid)
          .set({
            type: projectModel.type,
            title: projectModel.title,
            description: projectModel.description,
            url: projectModel.url,
            logoUrl: projectModel.logoUrl,
            updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
          }, { merge: true })),
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
   * Function to update the project views
   * @param uid uid of project
   * @param count count of project views
   */
  public incrementView(project: ProjectModel): Observable<ProjectModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(project.uid)
          .set({ views: firebase.firestore.FieldValue.increment(1) }, { merge: true })),
        map(() => project)
      );
  }
}
