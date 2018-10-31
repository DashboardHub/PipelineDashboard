import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Pinged } from '../models/pinged.model';
import { PingedService } from './pinged.service';

@Injectable({
    providedIn: 'root'
})
export class PingsResolver implements Resolve<List<Pinged>> {

    constructor(
        private pingService: PingedService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<List<Pinged>> {
        return this.pingService
            .findAll(route.params.id, route.params.monitorId);
    }

}
