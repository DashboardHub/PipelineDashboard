import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import { Environment } from '../environment.model';
import { List } from '../../list';
import { ActivatedRoute } from '@angular/router';
import { Summary } from "../summary.model";

@Component({
  selector: 'qs-environments-list-public',
  templateUrl: './environments-list-public.component.html',
})
export class EnvironmentsListPublicComponent implements OnInit {

  public environments: List<Environment> = new List<Environment>();
  public summary: Summary;

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentService
  ) {

  }

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
    this.calculateSummary();
  }

  refresh(): void {
    this.environmentService.findAll().subscribe((environments) => {
      this.environments = environments;
      this.calculateSummary();
    });
  }

  calculateSummary(): void {
    this.summary = {
      environments: 0,
      releases: 0,
      monitors: 0,
      views: 0,
      pings: 0,
    };
    this.environments.list.forEach((environment: Environment) => {
      this.summary.environments++;
      this.summary.releases += environment.releases;
      this.summary.monitors += environment.monitors ? environment.monitors.length : 0;
      this.summary.views += environment.views ? environment.views : 0;
      this.summary.pings += environment.pings.valid + environment.pings.invalid;
    });
  }
}
