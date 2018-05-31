import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Environment } from '../../environment.model';
import { EnvironmentService } from '../../environment.service';

@Injectable()
export class PublicEnvironmentResolver implements Resolve<Environment> {

  constructor(private environmentService: EnvironmentService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Environment> {
    return this.environmentService
      .findPublicById(route.params.id);
  }
}
