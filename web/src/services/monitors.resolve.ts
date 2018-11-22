import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Monitor } from '../models/monitor.model';
import { MonitorService } from './monitor.service';

@Injectable({
    providedIn: 'root'
})
export class MonitorsResolver implements Resolve<List<Monitor>> {

    constructor(
        private monitorService: MonitorService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<List<Monitor>> {
        return this.monitorService
            .findAll(route.params.id);
    }

}
