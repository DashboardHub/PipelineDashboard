import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { List } from '../../list';
import { Monitor } from './monitor.model';
import { MonitorService } from './monitor.service';

@Injectable()
export class MonitorsResolver implements Resolve<List<Monitor>> {

  constructor(private monitorService: MonitorService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<List<Monitor>> {
    return this.monitorService
      .findAll(route.params.id);
  }
}
