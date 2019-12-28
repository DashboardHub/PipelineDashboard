// Core modules
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as firebase from 'firebase';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { DialogConfirmationComponent } from '@shared/dialog/confirmation/dialog-confirmation.component';
import { IProject, ProjectModel, RepositoryModel } from '@shared/models/index.model';
import { ActivityService } from './activity.service';
import { AuthenticationService } from './authentication.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  /**
   * Life cycle method
   * @param afs AngularFirestore
   * @param authService AuthenticationService
   * @param activityService ActivityService
   * @param dialog MatDialog
   * @param repositoryService RepositoryService
   */
  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private activityService: ActivityService,
    private dialog: MatDialog,
    private fns: AngularFireFunctions,
    private repositoryService: RepositoryService
  ) {
  }

  /**
   * Save the new project for logged in user
   * @param data project data to be saved in db
   */
  public create(data: IProject): Observable<ProjectModel> {
    const project: ProjectModel = new ProjectModel(
      {
        uid: uuid(),
        ...data,
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

  /**
   * Show the delete confirmation dialog when click on the delete project
   * @param projectUid uid of project to be deleted
   */
  public showDeleteDialog(projectUid: string): Observable<void> {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig = {
      width: '500px',
      data: {
        title: 'Delete Project',
        content: 'Are you sure you want to delete?',
      },
    };

    return this.dialog
      .open(DialogConfirmationComponent, dialogConfig)
      .afterClosed()
      .pipe(
        filter((result: boolean) => !!result),
        switchMap(() => this.delete(projectUid))
      );
  }

  /**
   * Delete the project using project uid
   * @param uid uid of project to be deleted
   */
  public delete(uid: string): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<IProject>('projects').doc<IProject>(uid).delete()),
        take(1)
      );
  }

  /**
   * Find top 10 public projects list
   */
  public findPublicProjects(): Observable<ProjectModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>(
            'projects',
            (ref: firebase.firestore.Query) => ref.where('type', '==', 'public')
              .orderBy('updatedOn', 'desc').limit(10)
          )
          .valueChanges()),
        map((projects: IProject[]) => projects.map((project: IProject) => new ProjectModel(project)))
      );
  }

  /**
   * Find all private projects list
   */
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

  /**
   * Find the project details via id
   * @param uid uid of project
   */
  public findOneById(uid: string): Observable<ProjectModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<IProject>('projects').doc<IProject>(uid).valueChanges()),
        map((project: IProject) => new ProjectModel(project))
      );
  }

  /**
   * Update the project details
   * @param data project data to be updated
   */
  public save(data: IProject): Observable<void> {
    return this.findOneById(data.uid)
      .pipe(
        take(1),
        map((project: ProjectModel) => ({
          ...project.toData(),
          ...data,
          updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
        })),
        switchMap((project: IProject) => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(project.uid)
          .set(project, { merge: true }))
      );
  }

  /**
   * Add the repository in any project
   * @TODO: move to repository service
   * @param project project in which repository is added
   * @param repositories repositories to be added
   */
  public saveRepositories(project: ProjectModel, repositories: RepositoryModel[]): Observable<void> {
    /*
    // remove webhook from unselected repo
    if (project.repositories && project.repositories.length > 0) {
      const remove: string[] = project.repositories
        .filter((uid: string) => repositories.findIndex((repo: RepositoryModel) => uid === repo.uid) === -1);
      const removeWebhooks: Observable<RepositoryModel>[] = [];
      remove.forEach((uid: string) => {
        const tmp: Observable<RepositoryModel> = this.repositoryService.deleteGitWebhook({ uid }).pipe(take(1));
        removeWebhooks.push(tmp);
      });
      forkJoin(removeWebhooks).subscribe();
    }
    */

    if (!repositories.length) {
      return this.activityService
        .start()
        .pipe(
          switchMap(() => this.afs
            .collection<IProject>('projects')
            .doc<IProject>(project.uid)
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
        mergeMap(() => forkJoin(
          ...repositories.map((repository: RepositoryModel) => this.repositoryService.loadRepository(repository))
        )),
        switchMap(() => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(project.uid)
          .set(
            {
              repositories: repositories.map((repo: RepositoryModel) => repo.uid),
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true }
          )
        ),
        take(1)
      );
  }

  /**
   * Find top 4 popular projects by views
   */
  public getPopularProjects(): Observable<ProjectModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>(
            'projects',
            (ref: firebase.firestore.Query) => ref
              .where('type', '==', 'public')
              .orderBy('views', 'desc')
              .limit(4)
          )
          .valueChanges()),
        map((projects: IProject[]) => projects.map((project: IProject) => new ProjectModel(project)))
      );
  }

  /**
   * Update the followers count in project collection
   * @param projectUid string
   * @param counter string
   */
  public updateFollowers(projectUid: string, increase: boolean): Observable<void> {
    const callable: any = this.fns.httpsCallable('updateProjectFollowers');

    return callable({ projectUid, increase });
  }
}
