import { Component, Input } from '@angular/core';

// Dashboard hub model
import { MonitorModel } from '../../models/index.model';

@Component({
  selector: 'dashboard-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
})
export class MonitorsComponent {

  @Input()
  public monitors: MonitorModel[] = [];
}
