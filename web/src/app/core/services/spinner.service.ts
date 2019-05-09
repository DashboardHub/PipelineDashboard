import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerSubject: Subject<Boolean> = new Subject();

  // This function will set the progress bar status
  public setProgressBar(status: boolean): void {
    this.spinnerSubject.next(status);
  }

  // this function will return the status of progress bar to main component
  public getProgressBar(): Observable<Boolean> {
    return this.spinnerSubject.asObservable();
  }
}
