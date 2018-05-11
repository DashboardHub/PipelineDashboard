import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Environment } from '../../environment.model';
import { Monitor } from '../monitor.model';
import { List } from '../../../list';

@Component({
  selector: 'qs-monitors-list',
  templateUrl: './monitors-list.component.html',
})
export class MonitorsListComponent {

  public environment: Environment;
  public monitors: List<Monitor>;

  constructor(private route: ActivatedRoute) {
    this.environment = this.route.snapshot.data.environment;
    this.monitors = this.route.snapshot.data.monitors;
  }
}
