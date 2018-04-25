import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from "../environment.service";

@Component({
  selector: 'qs-environments-list-public',
  templateUrl: './environments-list-public.component.html',
})
export class EnvironmentsListPublicComponent implements OnInit {

  constructor(private environmentService: EnvironmentService) {

  }

  ngOnInit() {
    this.environmentService.getPublicEnvironments().subscribe((environments) => console.log(environments));
  }

}
