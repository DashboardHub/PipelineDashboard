import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Environment} from "./environment";
import { environment } from './../../../../environments/environment';
import {List} from "./../list";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class EnvironmentService {

  private url: string = environment.api;

  constructor(private http: HttpClient, private authHttp: AuthHttp) {
  }

  getPublicEnvironments(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>(this.url + '/environments');
  }

  getEnvironments(): Observable<List<Environment>> {
    return this.authHttp.get(this.url + '/environments/list')
      .map(response => response.json() as List<Environment>);
  }

  addEnvironment(environment: Environment): Observable<Environment> {
    return this.authHttp.post(this.url + '/environments', environment)
      .map(response => response.json() as Environment);
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

    return this.authHttp.patch(this.url + '/environments' + '/' + environment.id, patch)
      .map(response => response.json() as Environment);
  }

  getEnvironment(id: string): Observable<Environment> {
    return this.authHttp.get(this.url + '/environments' + '/' + id)
      .map(response => response.json() as Environment);
  }

  deleteEnvironment(id: string): Observable<Environment> {
    return this.authHttp.delete(this.url + '/environments' + '/' + id)
      .map(response => response.json() as Environment);
  }

}
