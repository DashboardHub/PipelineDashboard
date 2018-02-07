import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from './../../../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import {Summary} from "../summary/summary";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class SummaryService {

  private url: string = environment.api;

  constructor(private authHttp: AuthHttp) {
  }

  getPublicEnvironmentSummary(): Observable<Summary> {
    return this.authHttp.get(this.url + '/summary')
      .map(response => response.json() as Summary);
  }

  getPrivateEnvironmentSummary(): Observable<Summary> {
    return this.authHttp.get(this.url + '/environments/summary')
      .map(response => response.json() as Summary);
  }
}
