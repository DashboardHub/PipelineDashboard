import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Token} from "./token";
import { environment } from './../../../../../environments/environment';
import {List} from "./../../list";
import 'rxjs/add/operator/map';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

@Injectable()
export class TokenService {

  private url: string = environment.api;

  constructor(private http: HttpClient) {
  }

  add(token: Token): Observable<Token> {
    return this.http.post<Token>(this.url + `/environments/${token.environmentId}/tokens`, token);
  }

  delete(token: Token): Observable<List<Token>> {
    return this.http.delete<List<Token>>(this.url + `/environments/${token.environmentId}/tokens/${token.id}`);
  }
}
