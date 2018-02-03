import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from "rxjs/Observable";
import {Summary} from "./summary";
import {SummaryService} from "./summary.service";

@Injectable()
export class PublicSummaryResolver implements Resolve<any> {

  constructor(private summaryService: SummaryService) { }

  resolve(): Observable<Summary> {
    return this.summaryService
      .getPublicEnvironmentSummary();
  }
}
