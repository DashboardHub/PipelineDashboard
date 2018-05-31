import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { List } from '../../list';
import { Pinged } from './pinged.model';

@Injectable()
export class PingedService {

  constructor(private http: HttpClient) {
  }

  findAll(environmentId: string, monitorId: string): Observable<List<Pinged>> {
    return this.http.get<List<Pinged>>(`{api}/environments/${environmentId}/monitors/${monitorId}/pings`);
  }

  ping(environmentId: string, monitorId: string): Observable<Pinged> {
    return this.http.post<Pinged>(`{api}/environments/${environmentId}/monitors/${monitorId}/ping`, {
      environment: {
        id: environmentId,
      },
      monitor: {
        id: monitorId,
      },
    });
  }
}
