import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EnvironmentsService } from "./environments.service";
import { Environment } from "./environment";
import { List } from "./list";

@Injectable()
export class EnvironmentsResolver implements Resolve<any> {

  constructor(private environmentService: EnvironmentsService) { }

  resolve(): Promise<List<Environment>> {
    return this.environmentService
      .getPublicEnvironments();
  }
}
