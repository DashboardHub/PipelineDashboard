import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {List} from "./../list";
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Deployed } from "./deployed";
import { Release } from "./releases";

@Injectable()
export class DeployedService {

  private url: string = environment.api;

  private deployed: Subject<List<Deployed>> = new Subject<List<Deployed>>();
  private releases: Subject<List<Release>> = new Subject<List<Release>>();

  constructor(private authHttp: AuthHttp) {
  }

  getDeployed(environmentId: string): void {
    this.authHttp.get(`${this.url}/environments/${environmentId}/deployed`)
      .map(response => response.json() as List<Deployed>)
      .subscribe(
        data => this.deployed.next(data),
        error => console.log(error)
      );
  }

  getReleases(environmentId: string): void {
    this.authHttp.get(`${this.url}/environments/${environmentId}/releases`)
      .map(response => response.json() as List<Release>)
      .subscribe(
        data => this.releases.next(data),
        error => console.log(error)
      );
  }

  subscribeDeployed(): Observable<any> {
    return this.deployed.asObservable();
  }

  subscribeReleases(): Observable<any> {
    return this.releases.asObservable();
  }

}
