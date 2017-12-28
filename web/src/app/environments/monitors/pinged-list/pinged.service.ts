import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Pinged} from "./pinged";
import { environment } from '../../../../environments/environment';
import {List} from "./../../list";
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from "@angular/material";
import { Environment } from "../../environment";
import { Monitor } from "../monitor";

@Injectable()
export class PingedService {

  private url: string = environment.api;

  private subject: Subject<List<Pinged>> = new Subject<List<Pinged>>();

  constructor(private authHttp: AuthHttp, private snackBar: MatSnackBar) {
  }

  getPings(environmentId: string, monitorId: string): void {
    this.authHttp.get(`${this.url}/environments/${environmentId}/monitors/${monitorId}/pings`)
      .map(response => response.json() as List<Pinged>)
      .subscribe(
        data => this.subject.next(data),
        error => console.log(error)
      );
  }

  pingMonitor(environment: Environment, monitor: Monitor): void {
    this.authHttp.post(`${this.url}/environments/${environment.id}/monitors/${monitor.id}/ping`, { environment, monitor })
      .subscribe(
        data => {
          this.getPings(environment.id, monitor.id);
          this.snackBar.open(`Monitor pinged`, '', { duration: 2000 });
        },
        error => console.log(error)
      );
  }

  subscribePings(): Observable<any> {
    return this.subject.asObservable();
  }

}
