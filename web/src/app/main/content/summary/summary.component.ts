import { Component, Input, OnInit } from '@angular/core';
import {fuseAnimations} from "../../../core/animations";
import {Summary} from "./summary";
import { List } from '../list';
import { Environment } from '../environment/environment';

@Component({
  selector   : 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls  : ['./summary.component.scss'],
  animations : fuseAnimations
})
export class SummaryComponent implements OnInit {

  @Input() environments: List<Environment>;
  summary: Summary = new Summary();

  ngOnInit() {
    this.getSummary();
  }

  getSummary(): Summary {
    this.environments.list.forEach((environment) => {
      this.summary.environments++;
      this.summary.deploys = this.summary.deploys + environment.releases;
      this.summary.validPings = this.summary.validPings + environment.pings.valid;
      this.summary.invalidPings = this.summary.invalidPings + environment.pings.invalid;
    });

    return this.summary;
  }
}
