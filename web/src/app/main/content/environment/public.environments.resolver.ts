import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EnvironmentService } from "./environment.service";
import { Environment } from "./environment";
import { List } from "./../list";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PublicEnvironmentsResolver implements Resolve<any> {

  constructor(private environmentService: EnvironmentService) { }

  resolve(): Observable<List<Environment>> {
    return this.environmentService
      .getPublicEnvironments();
  }
}
