import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {Environment} from "./environment";
import { environment } from '../../environments/environment';
import {List} from "./list";
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Summary } from "./summary/summary";

@Injectable()
export class EnvironmentsService {

  private url: string = environment.api;

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {
  }

  getPublicEnvironments(): Promise<List<Environment>> {
    return this.http.get(this.url + '/environments')
      .toPromise()
      .then(response => response.json() as List<Environment>)
      .catch(this.handleError);
  }

  getPublicEnvironment(id: string): Promise<Environment> {
    return this.http.get(this.url + '/environments' + '/' + id)
      .toPromise()
      .then(response => response.json() as Environment)
      .catch(this.handleError);
  }

  getEnvironments(): Observable<List<Environment>> {
    return this.authHttp.get(this.url + '/environments/list')
      .map(response => response.json() as List<Environment>)
  }

  addEnvironment(environment: Environment): void {
    this.authHttp.post(this.url + '/environments', environment)
      .map(response => response.json())
      .subscribe(
        data => this.router.navigate(['/environments/' + data.id]),
        error => console.log(error)
      );
  }

  saveEnvironment(environment: Environment): void {
    const updateProperties: Array<string> = ['title', 'description', 'link', 'type'];

    let patch: Array<any> = updateProperties.map((item) => {
      return {
        op: 'replace',
        path: '/' + item,
        value: environment[item] || ''
      };
    });

    this.authHttp.patch(this.url + '/environments' + '/' + environment.id, patch)
      .map(response => response.json())
      .subscribe(
        data => this.router.navigate(['/environments/' + data.id]),
        error => console.log(error)
      );
  }

  getEnvironment(id: string): Observable<Environment> {
    return this.authHttp.get(this.url + '/environments' + '/' + id)
      .map(response => response.json() as Environment);
  }

  deleteEnvironment(id: string): Observable<Environment> {
    return this.authHttp.delete(this.url + '/environments' + '/' + id)
      .map(response => response.json());
  }

  getPublicEnvironmentSummary(): Observable<Summary> {
    return this.http.get(this.url + '/summary')
      .map(response => response.json() as Summary)
  }

  getPrivateEnvironmentSummary(): Observable<Summary> {
    return this.authHttp.get(this.url + '/environments/summary')
      .map(response => response.json() as Summary)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
