import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {Environment} from "./environment";

@Injectable()
export class EnvironmentsService {

  private url: string = 'https://4ndvu62321.execute-api.eu-west-2.amazonaws.com/dev/environments';

  constructor(private http: Http) {
  }

  getEnvironments(): Promise<Array<Environment>> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json() as Array<Environment>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
