import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from "../../environment.service";
import { List } from "../../../list";
import { Environment } from "../../environment.model";
import { ActivatedRoute } from "@angular/router";
import { Profile } from "../../../auth/profile";

@Component({
  selector: 'qs-environments-list-private',
  templateUrl: './environments-list-private.component.html',
})
export class EnvironmentsListPrivateComponent implements OnInit {

  public environments: List<Environment> = new List<Environment>();
  public profile: Profile = new Profile();

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentService
  ) {

  }

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
    this.profile = this.route.snapshot.data['profile'];
  }

  refresh(): void {
    this.environmentService.findAllByOwner().subscribe((environments) => this.environments = environments);
  }
}
