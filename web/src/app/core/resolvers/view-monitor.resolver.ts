import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

// Dashboard hub model and services
import { MonitorModel } from '../../shared/models/index.model';
import { MonitorService } from '../services/index.service';

@Injectable({
  providedIn: 'root',
})
export class ViewMonitorResolver implements Resolve<MonitorModel> {

  constructor(
    private monitorService: MonitorService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<MonitorModel> {
    return this.monitorService.findOneById(route.params.uid)
      .pipe(
        take(1),
        switchMap((monitor: MonitorModel) => {
          // for private project must have access
          if (!monitor || (monitor.type === 'private' && !this.monitorService.hasAccess(monitor) && !this.monitorService.isAdmin(monitor))) {
            this.router.navigate(['/']);
            return of(new MonitorModel());
          }

          return of(monitor);
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return of(new MonitorModel());
        })
      );
  }
}
