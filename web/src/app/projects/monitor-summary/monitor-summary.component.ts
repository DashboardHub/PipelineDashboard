// Core components
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

// Dashboard hub model
import { MonitorModel } from '@shared/models/index.model';

/**
 * Monitor summary component
 */
@Component({
  selector: 'dashboard-monitor-summary',
  templateUrl: './monitor-summary.component.html',
  styleUrls: ['./monitor-summary.component.scss'],
})
export class MonitorSummaryComponent implements OnChanges {

  @Input('monitors')
  public monitors: MonitorModel[] = [];

  /**
   * Filter the monitors based upon the valid and invalid status
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
   * Life cycle changes method
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.monitors = changes.monitors.currentValue;
  }
}
