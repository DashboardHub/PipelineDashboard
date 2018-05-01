import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { EnvironmentService } from '../../environment.service';
import { Environment } from '../../environment.model';

@Injectable()
export class PrivateEnvironmentResolver implements Resolve<Environment> {

  constructor(private environmentService: EnvironmentService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Environment> {
    return this.environmentService
      .findPrivateById(route.params['id']);
  }
}
