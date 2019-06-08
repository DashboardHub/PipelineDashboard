import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { ProjectModel, RepositoryModel } from '../../shared/models/index.model';
import { ActivityService } from './activity.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private afs: AngularFirestore,
        private authService: AuthenticationService,
        private activityService: ActivityService,
    ) {
    }

    // This function is for creating the project for logged in user
    public create(data: ProjectModel): Observable<ProjectModel> {
        let project: ProjectModel = {
            uid: uuid(),
            access: { admin: [this.authService.profile.uid] },
            ...data,
            repositories: [],
            createdOn: new Date(),
            updatedOn: new Date(),
        };

        return this.activityService
            .start()
            .pipe(
                switchMap(() => this.afs.collection<ProjectModel>('projects').doc(project.uid).set(project)),
                map(() => project),
            );
    }

    // This function delete the project via uid
    public delete(uid: string): Observable<void> {
        return this.activityService
            .start()
            .pipe(
                switchMap(() => this.afs.collection<ProjectModel>('projects').doc<ProjectModel>(uid).delete()),
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
                .valueChanges()),
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
                    .valueChanges()),
            );
    }

    // This function returns the project details via id
    public findOneById(uid: string): Observable<ProjectModel> {
        return this.activityService
            .start()
            .pipe(
                switchMap(() => this.afs.collection<ProjectModel>('projects').doc<ProjectModel>(uid).valueChanges()),
            );
    }

    // This function update the project details
    public save(project: ProjectModel): Observable<void> {
        return this.activityService
            .start()
            .pipe(
                switchMap(() => this.afs
                    .collection<ProjectModel>('projects')
                    .doc<ProjectModel>(project.uid)
                    .set({ ...project, updatedOn: new Date() }, { merge: true })),
        );
    }

    // This function add the repository in any project
    public saveRepositories(uid: string, repositories: string[]): Observable<void> {
        return this.activityService
            .start()
            .pipe(
                switchMap(() => this.afs
                    .collection<ProjectModel>('projects')
                    .doc<ProjectModel>(uid)
                    .set(
                        {
                            repositories: repositories.map((repoUid: string) => new RepositoryModel(repoUid).uid),
                            updatedOn: new Date(),
                        },
                        { merge: true })),
            );
    }
}
