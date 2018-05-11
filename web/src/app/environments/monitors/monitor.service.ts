import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { List } from '../../list';
import { Monitor } from './monitor.model';

@Injectable()
export class MonitorService {

  constructor(private http: HttpClient) {
  }

  findAll(environmentId: string): Observable<List<Monitor>> {
    return this.http.get<List<Monitor>>(`{api}/environments/${environmentId}/monitors`);
  }

  add(environmentId: string, monitor: Monitor): Observable<Monitor> {
    return this.http.post<Monitor>(`{api}/environments/${environmentId}/monitors`, monitor);
  }

  delete(environmentId: string, monitorId: string): Observable<void> {
    return this.http.delete<void>(`{api}/environments/${environmentId}/monitors/${monitorId}`);
  }
}
