import { Injectable } from '@angular/core';
import { Subject, Observable, of, timer } from 'rxjs';
import { finalize, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private counter: number = 0;
  private subject: Subject<number> = new Subject();

  // This function will set the progress bar status
  public setProgressBar(status: boolean): number {
    switch(status) {
        case true:
          this.counter++;
        break;
        case false:
          this.counter--;
        break;
    }

    // activity bar disappears too quickly, delay the final step
    if (this.counter === 0 && status === false) {
        timer(500).subscribe(() => this.subject.next(this.counter));
    } else {
        this.subject.next(this.counter);
    }

    return this.counter;
  }

  // this function will return the status of progress bar to main component
  public getProgressBar(): Observable<number> {
    return this.subject.asObservable();
  }

  public start(): Observable<number> {
      return of(0)
        .pipe(
            startWith(this.setProgressBar(true)),
            finalize(() => this.setProgressBar(false)),
        );
  }
}
