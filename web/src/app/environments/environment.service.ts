import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { List } from '../list';
import { Environment } from './environment.model';
import { Injectable } from '@angular/core';

export class Patch {
  op: string;
  path: string;
  value: any;
}

@Injectable()
export class EnvironmentService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>('{api}/environments');
  }

  findAllByOwner(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>('{api}/environments/list');
  }

  add(environment: Environment): Observable<Environment> {
    return this.http.post<Environment>('{api}/environments', environment);
  }

  update(id: string, environment: Environment): Observable<Environment> {
    const updateProperties: string[] = ['title', 'description', 'link', 'type', 'logo'];

    let patch: Patch[] = updateProperties.map((item: string): Patch => {
      return {
        op: 'replace',
        path: '/' + item,
        value: environment[item] || '',
      };
    });

    return this.http.patch<Environment>(`{api}/environments/${id}`, patch);
  }

  findPublicById(id: string): Observable<Environment> {
    return this.http.get<Environment>(`{api}/environments/${id}/view`);
  }

  findPrivateById(id: string): Observable<Environment> {
    return this.http.get<Environment>(`{api}/environments/${id}`);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`{api}/environments/${id}`);
  }
}
