import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {Environment} from "./environment";
import { environment } from '../../environments/environment';
import {List} from "./list";

@Injectable()
export class EnvironmentsService {

  private url: string = environment.api;

  constructor(private http: Http) {
  }

  getEnvironments(): Promise<List<Environment>> {
    return this.http.get(this.url + '/environments')
      .toPromise()
      .then(response => response.json() as List<Environment>)
      .catch(this.handleError);
  }

  addEnvironment(environment: Environment): Promise<Environment> {
    return this.http.post(this.url + '/environments', environment)
      .toPromise()
      .then(response => response.json() as Environment)
      .catch(this.handleError);
  }

  saveEnvironment(environment: Environment): Promise<Environment> {
    const updateProperties: Array<string> = ['title', 'description', 'link'];

    let patch: Array<any> = updateProperties.map((item) => {
      return {
        op: 'replace',
        path: '/' + item,
        value: environment[item] || ''
      };
    });

    return this.http.patch(this.url + '/environments' + '/' + environment.id, patch)
      .toPromise()
      .then(response => response.json() as Environment)
      .catch(this.handleError);
  }

  getEnvironment(id: string): Promise<Environment> {
    return this.http.get(this.url + '/environments' + '/' + id)
      .toPromise()
      .then(response => response.json() as Environment)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
