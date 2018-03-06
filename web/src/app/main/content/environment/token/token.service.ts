import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Token} from "./token";
import { environment } from './../../../../../environments/environment';
import {List} from "./../../list";
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class TokenService {

  private url: string = environment.api;

  constructor(
    private authHttp: AuthHttp
  ) {
  }

  add(token: Token): Observable<Token> {
    return this.authHttp.post(this.url + `/environments/${token.environmentId}/tokens`, token)
      .map(response => response.json() as Token);
  }

  delete(token: Token): Observable<List<Token>> {
    return this.authHttp.delete(this.url + `/environments/${token.environmentId}/tokens/${token.id}`)
      .map(response => response.json() as List<Token>);
  }
}
