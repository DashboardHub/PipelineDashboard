import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { List } from '../list';
import { Environment } from './environment.model';
import { Injectable } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class EnvironmentService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  findAll(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>('{api}/environments');
  }

  findAllByOwner(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>('{api}/environments/list');
  }

  add(environment: Environment): Observable<Environment> {
    return this.http.post<Environment>('{api}/environments', environment)
  }

  update(environment: Environment): Observable<Environment> {
    const updateProperties: Array<string> = ['title', 'description', 'link', 'type', 'logo'];

    let patch: Array<any> = updateProperties.map((item) => {
      return {
        op: 'replace',
        path: '/' + item,
        value: environment[item] || ''
      };
    });

    return this.http.patch<Environment>(`{api}/environments/${environment.id}`, patch)
  }

  findPublicById(id: string): Observable<Environment> {
    return this.http.get<Environment>(`{api}/environments/${id}/view`)
  }

  findPrivateById(id: string): Observable<Environment> {
    return this.http.get<Environment>(`{api}/environments/${id}`);
  }

  deleteById(id: string): Observable<Environment> {
    return this.http.delete<Environment>(`{api}/environments/${id}`);
  }
}
