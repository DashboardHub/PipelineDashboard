import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Token } from '../models/token.model';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class TokensResolver implements Resolve<List<Token>> {

    constructor(private tokenService: TokenService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<List<Token>> {
        return this.tokenService
            .findAllByEnvironmentId(route.params.id);
    }
}
