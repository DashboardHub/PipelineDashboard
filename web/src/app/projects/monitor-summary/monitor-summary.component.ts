// Core components
import { Component, Input } from '@angular/core';

// Dashboard hub model
import { MonitorModel } from '../../shared/models/index.model';

/**
 * Monitor summary component
 */
@Component({
  selector: 'dashboard-monitor-summary',
  templateUrl: './monitor-summary.component.html',
  styleUrls: ['./monitor-summary.component.scss'],
})
export class MonitorSummaryComponent {

  @Input()
  public monitors: MonitorModel[];

  /**
   * This function for filtering the monitors based upon the valid and invalid status
   * @param isValid isValid ping or not
   */
  public filterBy(isValid: boolean): MonitorModel[] {
    return Array.isArray(this.monitors) && this.monitors.filter((monitor: MonitorModel) => monitor.latestPing.isValid === isValid) || [];
  }
}
