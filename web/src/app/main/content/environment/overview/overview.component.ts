import { Component, OnInit } from '@angular/core';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";
import {fuseAnimations} from "../../../../core/animations";

@Component({
  selector   : 'app-overview',
  templateUrl: './overview.component.html',
  animations : fuseAnimations
})
export class OverviewComponent implements OnInit {

  environment: Environment = new Environment('');

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
  }
}
