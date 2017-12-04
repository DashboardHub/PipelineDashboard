import {Component, OnInit} from '@angular/core';

import {List} from "./list";
import {Environment} from "./environment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent implements OnInit {

  environments: List<Environment> = new List<Environment>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
  }

}
