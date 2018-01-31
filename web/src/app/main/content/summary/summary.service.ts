import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from './../../../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import {Summary} from "../summary/summary";

@Injectable()
export class SummaryService {

  private url: string = environment.api;

  constructor(private http: HttpClient) {
  }

  getPublicEnvironmentSummary(): Observable<Summary> {
    return this.http.get<Summary>(this.url + '/summary');
  }

  getPrivateEnvironmentSummary(): Observable<Summary> {
    return this.http.get<Summary>(this.url + '/environments/summary');
  }
}
