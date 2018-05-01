import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { List } from '../../../list';
import { Environment } from '../../environment.model';
import { EnvironmentService } from '../../environment.service';

@Injectable()
export class PublicEnvironmentsResolver implements Resolve<List<Environment>> {

  constructor(private environmentService: EnvironmentService) { }

  resolve(): Observable<List<Environment>> {
    return this.environmentService
      .findAll();
  }
}
