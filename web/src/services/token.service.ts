import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Token } from '../models/token.model';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private http: HttpClient) {
    }

    findAllByEnvironmentId(id: string): Observable<List<Token>> {
        return this.http.get<List<Token>>(`{api}/environments/${id}/tokens`);
    }

    add(token: Token): Observable<Token> {
        return this.http.post<Token>(`{api}/environments/${token.environmentId}/tokens`, token);
    }

    delete(token: Token): Observable<List<Token>> {
        return this.http.delete<List<Token>>(`{api}/environments/${token.environmentId}/tokens/${token.id}`);
    }
}
