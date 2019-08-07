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
export class MonitorSummaryComponent  {

  public _monitors: MonitorModel[] = [];
  @Input('monitors')
  set monitors(value: MonitorModel[]) {
    this._monitors = value;
  }

  /**
   * This function for filtering the monitors based upon the valid and invalid status
   * @param isValid isValid ping or not
   */
  public filterBy(isValid: boolean): MonitorModel[] {
    return this._monitors.filter((monitor: MonitorModel) => {
      if (monitor && monitor.latestPing) {
        return monitor.latestPing.isValid === isValid;
      }
    });
  }
}
