import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { EnvironmentsService } from "../environments.service";

@Injectable()
export class EnvironmentsSummaryPrivateResolver implements Resolve<any> {

  constructor(private environmentService: EnvironmentsService) { }

  resolve(): Observable<any> {
    return this.environmentService
      .getPrivateEnvironmentSummary();
  }
}
