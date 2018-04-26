import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'qs-environments-list-private',
  templateUrl: './environments-list-private.component.html',
})
export class EnvironmentsListPrivateComponent implements OnInit {

  constructor(private environmentService: EnvironmentService) {

  }

  ngOnInit() {
    this.environmentService.findAllByOwner().subscribe((environments) => console.log(environments));
  }
}
