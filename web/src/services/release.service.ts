import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Deployed } from '../models/deployed.model';
import { List } from '../models/list.model';
import { Release } from '../models/release.model';

@Injectable({
    providedIn: 'root'
})
export class ReleaseService {
    constructor(
        private http: HttpClient
    ) { }

    findAllByEnvironmentId(environmentId: string): Observable<List<Release>> {
        return this.http.get<List<Release>>(`{api}/environments/${environmentId}/releases`);
    }

    add(deployed: Deployed): Observable<Release> {
        return this.http.post<Release>(`{api}/environments/${deployed.environmentId}/deployed/${deployed.token}/${deployed.state}`, {
            release: deployed.release
        });
    }
}
