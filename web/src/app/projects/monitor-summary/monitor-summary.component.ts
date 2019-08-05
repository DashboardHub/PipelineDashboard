// Core components
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

// Third party modules
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { ProjectService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitor-summary',
  templateUrl: './monitor-summary.component.html',
  styleUrls: ['./monitor-summary.component.scss'],
})
export class MonitorSummaryComponent {

  @Input()
  public monitors: MonitorModel[];

  public filterBy(isValid: boolean): MonitorModel[] {
    return this.monitors.filter((monitor: MonitorModel) => monitor.latestPing.isValid === isValid);
  }
}
