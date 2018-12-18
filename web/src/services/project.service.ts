import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProjectModel } from '../models/index.model';
import { from, Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AuthenticationService } from './authentication.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private afs: AngularFirestore,
        private authService: AuthenticationService,
    ) {
    }

    public create(data: ProjectModel): Observable<ProjectModel> {
        let project: ProjectModel = {
            uid: uuid(),
            access: { admin: [this.authService.profile.uid] },
            ...data,
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

    public delete(uid: string): Observable<void> {
        return from(
            this.afs
                .collection<ProjectModel>('projects')
                .doc<ProjectModel>(uid)
                .delete()
        );
    }
}
