import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { EnvironmentService } from "../environment.service";
import { Environment } from "../environment";

@Injectable()
export class EnvironmentViewResolver implements Resolve<any> {

  constructor(private environmentService: EnvironmentService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Environment> {
    return this.environmentService
      .getEnvironment(route.params['id']);
  }
}
