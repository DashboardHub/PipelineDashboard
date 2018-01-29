import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from "rxjs/Observable";
import {Pinged} from "./pinged";
import {List} from "../../../list";
import {PingedService} from "./pinged.service";

@Injectable()
export class PingsResolver implements Resolve<List<Pinged>> {

  constructor(private pingedService: PingedService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<List<Pinged>> {
    return this.pingedService
      .findAll(route.params.id, route.params.monitorId);
  }
}
