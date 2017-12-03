import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-environments-summary',
  templateUrl: './environments-summary.component.html'
})
export class EnvironmentsSummaryComponent implements OnInit {

  summary: Array<{'name','value'}> = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.summary.push({ name: 'Environments', value: this.route.snapshot.data['summary'].environments });
    this.summary.push({ name: 'Deploys', value: this.route.snapshot.data['summary'].deploys });
  }
}
