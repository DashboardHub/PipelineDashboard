import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Environment} from "./environment";
import { environment } from './../../../../environments/environment';
import {List} from "./../list";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EnvironmentService {

  private url: string = environment.api;

  constructor(private http: HttpClient) {
  }

  getPublicEnvironments(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>(this.url + '/environments');
  }

  getEnvironments(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>(this.url + '/environments/list');
  }

  addEnvironment(environment: Environment): Observable<Environment> {
    return this.http.post<Environment>(this.url + '/environments', environment);
  }

  saveEnvironment(environment: Environment): Observable<Environment> {
    const updateProperties: Array<string> = ['title', 'description', 'link', 'type', 'logo'];

    let patch: Array<any> = updateProperties.map((item) => {
      return {
        op: 'replace',
        path: '/' + item,
        value: environment[item] || ''
      };
    });

    return this.http.patch<Environment>(this.url + '/environments' + '/' + environment.id, patch);
  }

  getEnvironment(id: string): Observable<Environment> {
    return this.http.get<Environment>(this.url + '/environments' + '/' + id);
  }

  deleteEnvironment(id: string): Observable<Environment> {
    return this.http.delete<Environment>(this.url + '/environments' + '/' + id);
  }

}
