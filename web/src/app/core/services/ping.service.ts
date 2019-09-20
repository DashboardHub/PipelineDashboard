// Core modules
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Dashboard model and services
import { IProject, PingModel } from '@shared/models/index.model';
import { ActivityService } from './activity.service';

/**
 * Ping service
 */
@Injectable({
  providedIn: 'root',
})
export class PingService {

  /**
   * Lifecycle method
   * @param afs AngularFirestore instance
   * @param activityService ActivityService instance
   */
  constructor(
    private afs: AngularFirestore,
    private activityService: ActivityService
  ) {
  }

  /**
   * Find all the pings by monitor using monitorUid
   * @param projectUid uid of project
   * @param monitorUid uid of monitor
   * @returns Observable
   */
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
