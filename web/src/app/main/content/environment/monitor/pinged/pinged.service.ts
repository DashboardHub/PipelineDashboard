import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../../../environments/environment';
import { List } from "./../../../list";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import {Pinged} from "./pinged";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PingedService {

  private url: string = environment.api;

  constructor(
    private authHttp: AuthHttp
  ) {
  }

  findAll(environmentId: string, monitorId: string): Observable<List<Pinged>> {
    return this.authHttp.get(`${this.url}/environments/${environmentId}/monitors/${monitorId}/pings`)
      .map(response => response.json() as List<Pinged>);
  }

  ping(environmentId: string, monitorId: string): Observable<Pinged> {
    return this.authHttp.post(`${this.url}/environments/${environmentId}/monitors/${monitorId}/ping`, {
      environment: {
        id: environmentId
      },
      monitor: {
        id: monitorId
      }
    })
      .map(response => response.json() as Pinged);
  }
}
