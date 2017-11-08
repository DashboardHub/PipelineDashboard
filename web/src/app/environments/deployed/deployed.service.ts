import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {List} from "./../list";
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Deployed } from "./deployed";

@Injectable()
export class DeployedService {

  private url: string = environment.api;

  private subject: Subject<List<Deployed>> = new Subject<List<Deployed>>();

  constructor(private authHttp: AuthHttp) {
  }

  getDeployed(environmentId: string): void {
    this.authHttp.get(`${this.url}/environments/${environmentId}/deployed`)
      .map(response => response.json() as List<Deployed>)
      .subscribe(
        data => this.subject.next(data),
        error => console.log(error)
      );
  }

  subscribeDeployed(): Observable<any> {
    return this.subject.asObservable();
  }

}
