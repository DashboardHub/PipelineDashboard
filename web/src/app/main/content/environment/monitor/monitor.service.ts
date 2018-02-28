import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import {Monitor} from "./monitor";
import {List} from "../../list";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MonitorService {

  private url: string = environment.api;

  constructor(
    private authHttp: AuthHttp
  ) {
  }

  add(monitor: Monitor): Observable<Monitor> {
    return this.authHttp.post(`${this.url}/environments/${monitor.environmentId}/monitors`, monitor)
      .map(response => response.json() as Monitor);
  }

  delete(monitor: Monitor): Observable<List<Monitor>> {
    return this.authHttp.delete(`${this.url}/environments/${monitor.environmentId}/monitors/${monitor.id}`)
      .map(response => response.json() as List<Monitor>);
  }
}
