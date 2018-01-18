import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector   : 'app-environment-view',
  templateUrl: './environment-view.component.html',
  animations : fuseAnimations
})
export class EnvironmentViewComponent implements OnInit {

  environment: Environment = new Environment('');

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
  }

}
