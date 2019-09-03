import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

// Rxjs operators
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// Application model and services
import { IStats, StatsModel } from '@shared/models/index.model';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {

  constructor(
    private afs: AngularFirestore,
    private activityService: ActivityService
  ) { }

  /**
   * Function to return the application stats
   */
  public getApplicationStats(): Observable<StatsModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<IStats>('platform')
          .doc<IStats>('stats')
          .valueChanges()),
        map((stats: IStats) => new StatsModel(stats))
      );
  }
}
