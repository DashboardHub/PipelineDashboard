// angular core imports
import { Injectable } from '@angular/core';
import { of, timer, Observable, Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private counter: number = 0;
  private subject: Subject<number> = new Subject();

  /**
   * Change status of the progress bar
   *
   * @param {boolean} status enable/disable progress bar
   */
  public setProgressBar(status: boolean): number {
    if (status) {
        this.counter++;
    }

    if (!status) {
        this.counter--;
    }

    // activity bar disappears too quickly, delay the final step
    if (this.counter === 0 && status === false) {
        timer(500).subscribe(() => this.subject.next(this.counter));
    } else {
        this.subject.next(this.counter);
    }

    return this.counter;
  }

  /**
   * Retrieve the status of progress bar
   */
  public getProgressBar(): Observable<number> {
    return this.subject.asObservable();
  }

  /**
   * Starts the oberservable chain and finishes when complete
   */
  public start(): Observable<number> {
      return of(0)
        .pipe(
            tap(() => this.setProgressBar(true)),
            finalize(() => this.setProgressBar(false)),
        );
  }
}
