// Angular modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// 3rd party
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

// Dashboard hub model and services
import { PingService } from '@core/services/index.service';
import { PingModel } from '@shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class PingsResolver implements Resolve<PingModel[]> {

  /**
   * Life cycle method
   * @param pingService PingService instance
   * @param router Router instance
   */
  constructor(
    private pingService: PingService,
    private router: Router
  ) { }

  /**
   * Method to handle ping route
   * @param route ActivatedRouteSnapshot instance
   */
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
