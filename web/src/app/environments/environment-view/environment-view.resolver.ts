import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { EnvironmentsService } from "../environments.service";

@Injectable()
export class EnvironmentViewResolver implements Resolve<any> {

  constructor(private environmentService: EnvironmentsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.environmentService
      .getEnvironment(route.params['id']);
  }
}
