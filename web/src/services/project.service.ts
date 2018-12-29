import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProjectModel, RepositoryModel } from '../models/index.model';
import { from, Observable, of, forkJoin } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AuthenticationService } from './authentication.service';
import { mergeMap, tap } from 'rxjs/operators';
import { RepositoryService } from './repository.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private afs: AngularFirestore,
        private authService: AuthenticationService,
        private repositoryService: RepositoryService
    ) {
    }

    public create(data: ProjectModel): Observable<ProjectModel> {
        let project: ProjectModel = {
            uid: uuid(),
            access: { admin: [this.authService.profile.uid] },
            ...data,
            repositories: [],
            createdOn: new Date(),
            updatedOn: new Date(),
        };

        return from(
                this.afs.collection<ProjectModel>('projects')
                .doc(project.uid)
                .set(project)
            )
            .pipe(
                () => of(project)
            );
    }

    public findPublicProjects(): Observable<ProjectModel[]> {
        return from(this.afs
            .collection<ProjectModel>(
                'projects',
                (ref: firebase.firestore.Query) => ref.where('type', '==', 'public')
                                                    .orderBy('updatedOn', 'desc')
            )
            .valueChanges()
        );
    }

    public findMyProjects(): Observable<ProjectModel[]> {
        return from(this.afs
            .collection<ProjectModel>(
                'projects',
                (ref: firebase.firestore.Query) => ref.where('access.admin', 'array-contains', this.authService.profile.uid)
                                                    .orderBy('updatedOn', 'desc')
            )
            .valueChanges()
        );
    }

    public findOneById(uid: string): Observable<ProjectModel> {
        return from(this.afs.collection<ProjectModel>('projects').doc<ProjectModel>(uid).valueChanges());
    }

    public save(project: ProjectModel): Observable<void> {
        return from(
            this.afs
                .collection<ProjectModel>('projects')
                .doc<ProjectModel>(project.uid)
                .set({ ...project, updatedOn: new Date() }, { merge: true })
        );
    }

    public saveRepositories(uid: string, repositories: string[]): Observable<void> {
        return from(
            this.afs
                .collection<ProjectModel>('projects')
                .doc<ProjectModel>(uid)
                .set(
                {
                    repositories: repositories.map((repoUid: string) => new RepositoryModel(repoUid).uid),
                    updatedOn: new Date(),
                },
                { merge: true })
        );
    }

    public delete(uid: string): Observable<void> {
        return from(
            this.afs
                .collection<ProjectModel>('projects')
                .doc<ProjectModel>(uid)
                .delete()
        );
    }
}
