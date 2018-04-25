import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { List } from "../list";
import { Environment } from "./environment.model";
import { Injectable } from "@angular/core";

@Injectable()
export class EnvironmentService {

  constructor(private http: HttpClient) {
  }

  getPublicEnvironments(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>('/environments');
  }

  getEnvironments(): Observable<List<Environment>> {
    return this.http.get<List<Environment>>('/environments/list');
  }
}
