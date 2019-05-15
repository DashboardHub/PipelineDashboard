import { Injectable } from '@angular/core';
import { Subject, Observable, of, timer } from 'rxjs';
import { finalize, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activeCounter: number = 0;
  private spinnerSubject: Subject<number> = new Subject();

  // This function will set the progress bar status
  public setProgressBar(status: boolean): number {
    switch(status) {
        case true:
          this.activeCounter++;
        break;
        case false:
          this.activeCounter--;
        break;
    }

    // activity bar disappears too quickly, delay the final step
    if (this.activeCounter === 0 && status === false) {
        timer(500).subscribe(() => this.spinnerSubject.next(this.activeCounter));
    } else {
        this.spinnerSubject.next(this.activeCounter);
    }

    return this.activeCounter;
  }

  // this function will return the status of progress bar to main component
  public getProgressBar(): Observable<number> {
    return this.spinnerSubject.asObservable();
  }

  public start(): Observable<number> {
      return of(0)
        .pipe(
            startWith(this.setProgressBar(true)),
            finalize(() => this.setProgressBar(false)),
        );
  }
}
