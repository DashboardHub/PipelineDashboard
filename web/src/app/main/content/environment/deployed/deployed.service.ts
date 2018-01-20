import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../../environments/environment';
import { List } from "./../../list";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { Deployed } from "./deployed";
import { Release } from "./release";
import { State } from "./state";
import { MatSnackBar } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { EnvironmentService } from "../environment.service";

@Injectable()
export class DeployedService {

  private url: string = environment.api;
  states: Array<State> = [
    { name: 'Start Build', value: 'startBuild', types: ['build', 'build-deploy'] },
    { name: 'Finish Build', value: 'finishBuild', types: ['build', 'build-deploy'] },
    { name: 'Build Failed', value: 'failBuild', types: ['build', 'build-deploy'] },
    { name: 'Start Deploy', value: 'startDeploy', types: ['deploy', 'build-deploy'] },
    { name: 'Finish Deploy', value: 'finishDeploy', types: ['deploy', 'build-deploy'] },
    { name: 'Deploy Failed', value: 'failDeploy', types: ['deploy', 'build-deploy'] }
  ];

  // private deployed: Subject<List<Deployed>> = new Subject<List<Deployed>>();
  // private releases: Subject<List<Release>> = new Subject<List<Release>>();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    private snackBar: MatSnackBar
  ) {
  }

  findAll(environmentId: string): Observable<List<Deployed>> {
    return this.http.get<List<Deployed>>(`${this.url}/environments/${environmentId}/deployed`);
  }

  findAllReleases(environmentId: string): Observable<List<Release>> {
    return this.http.get<List<Release>>(`${this.url}/environments/${environmentId}/releases`);
  }

  // addDeployed(deployed: Deployed): void {
  //   this.http.post(`${this.url}/environments/${deployed.environmentId}/deployed/${deployed.token.id}/${deployed.state}`, deployed)
  //     .map(response => response.json())
  //     .subscribe(
  //       data => {
  //         this.getDeployedAndReleases(deployed.environmentId);
  //         this.snackBar.open(`Release ${deployed.release} added`, '', { duration: 2000 });
  //       },
  //       error => console.log(error)
  //     );
  // }

  // getDeployedAndReleases(environmentId: string): void {
  //   this.getDeployed(environmentId);
  //   this.getReleases(environmentId);
  //   this.environmentService.refreshEnvironment(environmentId);
  // }
  //
  // subscribeDeployed(): Observable<any> {
  //   return this.deployed.asObservable();
  // }
  //
  // subscribeReleases(): Observable<any> {
  //   return this.releases.asObservable();
  // }

}
