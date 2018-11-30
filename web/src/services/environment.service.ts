import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Environment } from '../models/environment.model';

export class Patch {
    op: string;
    path: string;
    value: any;
}

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    constructor(
        private http: HttpClient,
        private firebase: AngularFirestore,
    ) {
    }

    findAll(): Observable<Environment[]> {
        console.log('SERVICE');
        return this.firebase
            .collection<Environment>('environments')
            .valueChanges();
    }

    findAllByOwner(): Observable<List<Environment>> {
        return this.http.get<List<Environment>>('{api}/environments/list');
    }

    add(environment: Environment): Observable<Environment> {
        return this.http.post<Environment>('{api}/environments', environment);
    }

    update(id: string, environment: Environment): Observable<Environment> {
        const updateProperties: string[] = ['title', 'description', 'link', 'type', 'logo'];

        let patch: Patch[] = updateProperties.map((item: string): Patch => {
            return {
                op: 'replace',
                path: '/' + item,
                value: environment[item] || '',
            };
        });

        return this.http.patch<Environment>(`{api}/environments/${id}`, patch);
    }

    findPublicById(id: string): Observable<Environment> {
        return this.http.get<Environment>(`{api}/environments/${id}/view`);
    }

    findPrivateById(id: string): Observable<Environment> {
        return this.http.get<Environment>(`{api}/environments/${id}`);
    }

    deleteById(id: string): Observable<void> {
        return this.http.delete<void>(`{api}/environments/${id}`);
    }
}
