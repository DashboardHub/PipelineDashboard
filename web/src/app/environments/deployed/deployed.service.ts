import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { List } from "./../list";
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Deployed } from "./deployed";
import { Release } from "./releases";
import { State } from "./state";
import { EnvironmentsService } from "../environments.service";

@Injectable()
export class DeployedService {

  private url: string = environment.api;
  states: Array<State> = [
    { name: 'Start Build', value: 'startBuild', types: ['build', 'build-deploy'] },
    { name: 'Finish Build', value: 'finishBuild', types: ['build', 'build-deploy'] },
    { name: 'Start Deploy', value: 'startDeploy', types: ['deploy', 'build-deploy'] },
    { name: 'Finish Deploy', value: 'finishDeploy', types: ['deploy', 'build-deploy'] }
  ];

  private deployed: Subject<List<Deployed>> = new Subject<List<Deployed>>();
  private releases: Subject<List<Release>> = new Subject<List<Release>>();

  constructor(private authHttp: AuthHttp, private environmentService: EnvironmentsService) {
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

  addDeployed(deployed: Deployed): void {
    this.authHttp.post(`${this.url}/environments/${deployed.environmentId}/deployed/${deployed.token.id}/${deployed.state}`, deployed)
      .map(response => response.json())
      .subscribe(
        data => this.getDeployedAndReleases(deployed.environmentId),
        error => console.log(error)
      );
  }

  getDeployedAndReleases(environmentId: string): void {
    this.getDeployed(environmentId);
    this.getReleases(environmentId);
    this.environmentService.refreshEnvironment(environmentId);
  }

  subscribeDeployed(): Observable<any> {
    return this.deployed.asObservable();
  }

  subscribeReleases(): Observable<any> {
    return this.releases.asObservable();
  }

}
