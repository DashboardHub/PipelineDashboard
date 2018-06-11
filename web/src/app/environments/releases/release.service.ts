import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { List } from '../../list';
import { Release } from './release.model';

@Injectable()
export class ReleaseService {
  constructor(private http: HttpClient) {}

  findAllByEnvironmentId(environmentId: string): Observable<List<Release>> {
    return this.http.get<List<Release>>(`{api}/environments/${environmentId}/releases`);
  }

  add(environmentId: string, release: Release, state: string): Observable<Release> {
    return this.http.post<Release>(`{api}/environments/${environmentId}/deployed/${release.token.id}/${state}`, {
      release: release.version
    });
  }
}
