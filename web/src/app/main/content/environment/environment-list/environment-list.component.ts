import { Component, Input, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Environment } from "../environment";
import { List } from "../../list";
import {Profile} from "../../auth/profile";

@Component({
    selector   : 'app-environment-list',
    templateUrl: './environment-list.component.html',
    styleUrls  : ['./environment-list.component.scss'],
    animations : fuseAnimations
})
export class EnvironmentListComponent implements OnInit {

  @Input()
  environments: List<Environment> = new List<Environment>();

  @Input()
  profile: Profile;

  constructor() {
  }

  ngOnInit() {
  }

}
