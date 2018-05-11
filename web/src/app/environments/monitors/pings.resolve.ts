import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { List } from '../../list';
import { PingedService } from './pinged.service';
import { Pinged } from './pinged.model';

@Injectable()
export class PingsResolver implements Resolve<List<Pinged>> {

  constructor(private pingService: PingedService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<List<Pinged>> {
    return this.pingService
      .findAll(route.params.id, route.params.monitorId);
  }
}
