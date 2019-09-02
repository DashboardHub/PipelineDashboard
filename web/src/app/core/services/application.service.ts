import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

// Rxjs operators
import { Observable } from 'rxjs';

// Application model and services
import { StatsModel } from '@shared/models/stats.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {

  constructor(private afs: AngularFirestore) { }

  /**
   * Function to return the application stats
   */
  public getApplicationStats(): Observable<StatsModel> {
    return this.afs.collection<StatsModel>('platform')
      .doc<StatsModel>('stats')
      .valueChanges();
  }
}
