import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Environment } from "../environment";
import { environment } from './../../../../../environments/environment';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector   : 'app-environment-view',
  templateUrl: './environment-view.component.html',
  animations : fuseAnimations
})
export class EnvironmentViewComponent implements OnInit {

  environment: Environment = new Environment('');
  private url: string = environment.api;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
  }

  getCommand(state: string) {
    if (this.environment.tokens.length) {
      return `curl -XPOST -H "Content-Type: application/json"  -d \'{ "release":"vX.Y.Z" }\' ${this.url}/environments/${this.environment.id}/deployed/${this.environment.tokens[0].id}/${state}`;
    } else {
      return 'Please create at least 1 token';
    }
  }
}
