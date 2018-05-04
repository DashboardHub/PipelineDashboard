import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { List } from '../../list';
import { Token } from './token.model';
import { TokenService } from './token.service';

@Injectable()
export class TokensResolver implements Resolve<List<Token>> {

  constructor(private tokenService: TokenService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<List<Token>> {
    return this.tokenService
      .findAllByEnvironmentId(route.params['id']);
  }
}
