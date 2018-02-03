import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../../../environments/environment';
import { List } from "./../../../list";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {Pinged} from "./pinged";
import {Environment} from "../../environment";

@Injectable()
export class PingedService {

  private url: string = environment.api;

  constructor(
    private http: HttpClient
  ) {
  }

  findAll(environmentId: string, monitorId: string): Observable<List<Pinged>> {
    return this.http.get<List<Pinged>>(`${this.url}/environments/${environmentId}/monitors/${monitorId}/pings`);
  }

  ping(environmentId: string, monitorId: string): Observable<Pinged> {
    return this.http.post<Pinged>(`${this.url}/environments/${environmentId}/monitors/${monitorId}/ping`, {
      environment: {
        id: environmentId
      },
      monitor: {
        id: monitorId
      }
    });
  }
}
