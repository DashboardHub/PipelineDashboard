import { Component, Input, OnInit } from '@angular/core';
import { Environment } from '../environment.model';
import { List } from '../../list';
import { Summary } from "../summary.model";
import { Profile } from "../../auth/profile";

@Component({
  selector: 'qs-environments-list',
  templateUrl: './environments-list.component.html',
})
export class EnvironmentsListComponent implements OnInit {

  @Input() public environments: List<Environment> = new List<Environment>();
  @Input() public profile: Profile = new Profile();
  public summary: Summary;

  ngOnInit() {
    this.calculateSummary();
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
