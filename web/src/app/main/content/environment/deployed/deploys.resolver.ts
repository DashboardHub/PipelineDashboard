import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { DeployedService } from "./deployed.service";
import { List } from "../../list";
import { Deployed } from "./deployed";

@Injectable()
export class DeploysResolver implements Resolve<List<Deployed>> {

  constructor(private deployedService: DeployedService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<List<Deployed>> {
    return this.deployedService
      .findAll(route.params.id);
  }
}
