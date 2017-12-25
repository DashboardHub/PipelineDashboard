import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Token} from "./token";
import { environment } from '../../../environments/environment';
import {List} from "./../list";
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from "@angular/material";

@Injectable()
export class TokensService {

  private url: string = environment.api;

  private subject: Subject<List<Token>> = new Subject<List<Token>>();

  constructor(private authHttp: AuthHttp, private snackBar: MatSnackBar) {
  }

  getTokens(environmentId: string): void {
    this.authHttp.get(`${this.url}/environments/${environmentId}/tokens`)
      .map(response => response.json() as List<Token>)
      .subscribe(
        data => this.subject.next(data),
        error => console.log(error)
      );
  }

  addToken(token: Token): void {
    this.authHttp.post(`${this.url}/environments/${token.environmentId}/tokens`, token)
      .map(response => response.json() as Token)
      .subscribe(
        data => {
          this.getTokens(token.environmentId);
          this.snackBar.open(`Token ${token.name} added`, '', { duration: 2000 });
        },
        error => console.log(error)
      );
  }

  deleteToken(token: Token): void {
    this.authHttp.delete(`${this.url}/environments/${token.environmentId}/tokens/${token.id}`)
      .subscribe(
        data => {
          this.getTokens(token.environmentId);
          this.snackBar.open(`Token ${token.name} removed`, '', { duration: 2000 });
        },
        error => console.log(error)
      );
  }

  subscribeTokens(): Observable<any> {
    return this.subject.asObservable();
  }

}
