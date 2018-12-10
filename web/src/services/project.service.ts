import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ProjectModel } from '../models/index.model';
import { from, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private afs: AngularFirestore,
        private authService: AuthenticationService,
    ) {
    }

    public create(project: ProjectModel): Observable<DocumentReference> {
        return from(this.afs.collection<ProjectModel>('projects')
            .add({ owners: [this.authService.profile.uid], ...project, createdOn: new Date(), updatedOn: new Date() }));
    }

    public findPublicProjects(): Observable<ProjectModel[]> {
        return from(this.afs.
            collection<ProjectModel>(
                'projects',
                (ref: firebase.firestore.Query) => ref.where('type', '==', 'public')
                                                    .orderBy('updatedOn', 'desc')
            )
            .valueChanges()
        );
    }

    public findMyProjects(): Observable<ProjectModel[]> {
        return from(this.afs.
            collection<ProjectModel>(
                'projects',
                (ref: firebase.firestore.Query) => ref.where('owners', 'array-contains', this.authService.profile.uid)
            )
            .valueChanges()
        );
    }
}
