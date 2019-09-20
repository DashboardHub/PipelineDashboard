// Core modules
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Spinner service
 */
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private spinnerSubject: Subject<Boolean> = new Subject();

  /**
   * Set the progress bar status
   * @param status status of the progress bar
   */
  public setProgressBar(status: boolean): void {
    this.spinnerSubject.next(status);
  }

  /**
   * Returns the status of progress bar to main component
   */
  public getProgressBar(): Observable<Boolean> {
    return this.spinnerSubject.asObservable();
  }
}
