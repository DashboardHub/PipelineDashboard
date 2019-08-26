import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Dashboard model and services
import { IProject, PingModel } from '@shared/models/index.model';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class PingService {

  constructor(
    private afs: AngularFirestore,
    private activityService: ActivityService
  ) {
  }

  // This function returns the pings details via monitorUid
  public findAllByMonitor(projectUid: string, monitorUid: string): Observable<PingModel[]> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(projectUid)
          .collection<PingModel>('pings',
            (ref: firebase.firestore.Query) => ref.where('monitorUid', '==', monitorUid)
              .orderBy('createdOn', 'desc')
          )
          .valueChanges())
      );
  }
}
