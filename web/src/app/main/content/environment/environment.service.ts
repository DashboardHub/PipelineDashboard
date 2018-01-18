import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Environment} from "./environment";
import { environment } from './../../../../environments/environment';
import {List} from "./../list";
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
// import { Summary } from "./summary/summary";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EnvironmentService {

  private url: string = environment.api;

  constructor(private http: HttpClient, private router: Router) {
  }

  getPublicEnvironments(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>(this.url + '/environments');
  }

  // getPublicEnvironment(id: string): Promise<Environment> {
  //   return this.http.get(this.url + '/environments' + '/' + id)
  //     .toPromise()
  //     .then(response => response.json() as Environment)
  //     .catch(this.handleError);
  // }
  //
  // getEnvironments(): Observable<List<Environment>> {
  //   return this.authHttp.get(this.url + '/environments/list')
  //     .map(response => response.json() as List<Environment>)
  // }
  //
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
  //
  getEnvironment(id: string): Observable<Environment> {
    return this.http.get<Environment>(this.url + '/environments' + '/' + id);
  }
  //
  // refreshEnvironment(id: string): void {
  //   this.authHttp.get(this.url + '/environments' + '/' + id)
  //     .map(response => response.json() as Environment)
  //     .subscribe(
  //       data => this.environment.next(data),
  //       error => console.log(error)
  //     );
  // }
  //
  deleteEnvironment(id: string): Observable<Environment> {
    return this.http.delete<Environment>(this.url + '/environments' + '/' + id);
  }
  //
  // getPublicEnvironmentSummary(): Observable<Summary> {
  //   return this.http.get(this.url + '/summary')
  //     .map(response => response.json() as Summary)
  // }
  //
  // getPrivateEnvironmentSummary(): Observable<Summary> {
  //   return this.authHttp.get(this.url + '/environments/summary')
  //     .map(response => response.json() as Summary)
  // }
  //
  // subscribeEnvironment(): Observable<any> {
  //   return this.environment.asObservable();
  // }

}
