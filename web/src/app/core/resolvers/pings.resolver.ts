// Angular modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// 3rd party
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Third party modules
import { PingService } from '@core/services/index.service';
import { PingModel } from '@shared/models/index.model';

// Dashboard hub model and services

@Injectable({
  providedIn: 'root',
})
export class PingsResolver implements Resolve<PingModel[]> {

  constructor(
    private pingService: PingService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PingModel[]> {
    return this.pingService.findAllByMonitor(route.params.projectUid, route.params.monitorUid)
      .pipe(
        take(1),
        catchError(() => {
          this.router.navigate(['/projects', route.params.projectUid, 'monitors']);

          return of([]);
        })
      );
  }
}
