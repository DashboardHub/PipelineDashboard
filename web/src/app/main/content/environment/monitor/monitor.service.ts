import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {Monitor} from "./monitor";
import {List} from "../../list";

@Injectable()
export class MonitorService {

  private url: string = environment.api;

  constructor(
    private http: HttpClient
  ) {
  }

  add(monitor: Monitor): Observable<Monitor> {
    return this.http.post<Monitor>(`${this.url}/environments/${monitor.environmentId}/monitors`, monitor);
  }

  delete(monitor: Monitor): Observable<List<Monitor>> {
    return this.http.delete<List<Monitor>>(`${this.url}/environments/${monitor.environmentId}/monitors/${monitor.id}`);
  }
}
