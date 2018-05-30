import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Release } from './release.model';
import { List } from '../../list';
import { ReleaseService } from './release.service';

@Injectable()
export class ReleasesResolver implements Resolve<List<Release>> {

  constructor(private releaseService: ReleaseService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<List<Release>> {
    return this.releaseService
      .findAllByEnvironmentId(route.params.id);
  }
}
