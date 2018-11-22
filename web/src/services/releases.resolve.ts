import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Release } from '../models/release.model';
import { ReleaseService } from './release.service';

@Injectable({
    providedIn: 'root'
})
export class ReleasesResolver implements Resolve<List<Release>> {

    constructor(private releaseService: ReleaseService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<List<Release>> {
        return this.releaseService
            .findAllByEnvironmentId(route.params.id);
    }
}
