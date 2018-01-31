import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { DeployedService } from "./../deployed.service";
import { List } from "./../../../list";
import { Release } from "../release";

@Injectable()
export class ReleasesResolver implements Resolve<List<Release>> {

  constructor(private deployedService: DeployedService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<List<Release>> {
    return this.deployedService
      .findAllReleases(route.params.id);
  }
}
