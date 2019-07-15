// Angular modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// Third party modules
import { of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { PingModel } from '../../shared/models/index.model';
import { PingService } from '../services/ping.service';

// Dashboard hub model and services

@Injectable({
  providedIn: 'root',
})
export class PingResolver implements Resolve<PingModel> {

  constructor(
    private pingService: PingService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): any {
    return this.pingService.findOneById(route.params.projectUid, route.params.monitorUid)
      .pipe(
        take(1),
        switchMap((pings: PingModel[]) => {
          return of(pings);
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return of(new PingModel());
        })
      );
  }
}
