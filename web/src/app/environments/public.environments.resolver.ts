import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs/Observable';
import { List } from '../list';
import { Environment } from './environment.model';

@Injectable()
export class PublicEnvironmentsResolver implements Resolve<List<Environment>> {

  constructor(private environmentService: EnvironmentService) { }

  resolve(): Observable<List<Environment>> {
    return this.environmentService
      .findAll();
  }
}
