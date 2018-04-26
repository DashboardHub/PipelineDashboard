import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { List } from "../list";
import { Environment } from "./environment.model";
import { Injectable } from "@angular/core";

@Injectable()
export class EnvironmentService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>('/environments');
  }

  findAllByOwner(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>('/environments/list');
  }

  add(environment: Environment): Observable<Environment> {
    return this.http.post<Environment>('/environments', environment)
  }

  update(environment: Environment): Observable<Environment> {
    const updateProperties: Array<string> = ['title', 'description', 'link', 'type', 'logo'];

    let patch: Array<any> = updateProperties.map((item) => {
      return {
        op: 'replace',
        path: '/' + item,
        value: environment[item] || ''
      };
    });

    return this.http.patch<Environment>(`/environments/${environment.id}`, patch)
  }

  findPublicById(id: string): Observable<Environment> {
    return this.http.get<Environment>(`/environments/${id}/view`)
  }

  findById(id: string): Observable<Environment> {
    return this.http.get<Environment>(`/environments/${id}`);
  }

  deleteById(id: string): Observable<Environment> {
    return this.http.delete<Environment>(`/environments/${id});
  }
}
