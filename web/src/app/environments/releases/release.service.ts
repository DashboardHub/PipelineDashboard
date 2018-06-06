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

  add(release: Release, state: string) {
    console.log(release, state);
  }
}
