// Core components
import { Component, Input, OnChanges } from '@angular/core';

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
export class MonitorSummaryComponent implements OnChanges {

  @Input()
  public monitors: MonitorModel[] = [];

  /**
   * This function for filtering the monitors based upon the valid and invalid status
   * @param isValid isValid ping or not
   */
  public filterBy(isValid: boolean): MonitorModel[] {
    return this.monitors.filter((monitor: MonitorModel) => {
      if (monitor && monitor.latestPing) {
        return monitor.latestPing.isValid === isValid;
      }
    });
  }

  /**
   * Method to detect the change in Input property from parent
   */
  ngOnChanges(): void {
    this.monitors = this.monitors;
  }
}
