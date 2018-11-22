import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Pinged } from '../models/pinged.model';

@Injectable({
    providedIn: 'root'
})
export class PingedService {

    constructor(private http: HttpClient) {
    }

    findAll(environmentId: string, monitorId: string): Observable<List<Pinged>> {
        return this.http.get<List<Pinged>>(`{api}/environments/${environmentId}/monitors/${monitorId}/pings`);
    }

    ping(environmentId: string, monitorId: string): Observable<Pinged> {
        return this.http.post<Pinged>(`{api}/environments/${environmentId}/monitors/${monitorId}/ping`, {
            environment: { id: environmentId },
            monitor: { id: monitorId }
        });
    }
}
