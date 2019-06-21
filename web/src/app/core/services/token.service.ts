import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { ProjectTokenModel } from '../../shared/models/index.model';
import { ActivityService } from './activity.service';
import { AuthenticationService } from './authentication.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private activityService: ActivityService,
    private projectService: ProjectService
  ) { }

  // This function returns the token details via id
  public findOneById(projectUid: string, tokenUid: string): Observable<ProjectTokenModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection('projects').doc(projectUid)
          .collection<ProjectTokenModel>('tokens').doc<ProjectTokenModel>(tokenUid)
          .valueChanges()
        )
      );
  }

  // This function returns the tokens list
  public findProjectTokens(projectUid: string): Observable<ProjectTokenModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection(
            'projects',
            (ref: firebase.firestore.Query) => ref.where('access.admin', 'array-contains', this.authService.profile.uid)
          )
          .doc(projectUid)
          .collection<ProjectTokenModel>('tokens')
          .valueChanges()
        )
      );
  }

  // This function is for creating the token
  public create(projectUid: string, data: ProjectTokenModel): Observable<ProjectTokenModel> {
    let token: ProjectTokenModel = {
      uid: uuid(),
      ...data,
    };

    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection('projects').doc(projectUid)
          .collection<ProjectTokenModel>('tokens').doc(token.uid)
          .set(token)
        ),
        map(() => token)
      );
  }

  // This function update the token details
  public save(projectUid: string, data: ProjectTokenModel): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection('projects').doc(projectUid)
          .collection<ProjectTokenModel>('tokens').doc<ProjectTokenModel>(data.uid)
          .set({ ...data }, { merge: true }))
      );
  }

  // This function delete the token via uid
  public delete(projectUid: string, tokenUid: string): Observable<void> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection('projects').doc(projectUid)
          .collection<ProjectTokenModel>('tokens').doc<ProjectTokenModel>(tokenUid)
          .delete())
      );
  }

}
