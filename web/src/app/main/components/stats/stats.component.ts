// Core modules
import { Component, OnInit } from '@angular/core';

// Application model and services
import { ApplicationService } from '@core/services/application.service';
import { StatsModel } from '@shared/models/stats.model';

/**
 * Application stats component on dashboard
 */
@Component({
  selector: 'dashboard-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {

  public stats: StatsModel;

  /**
   * Life cycle method
   * @param applicationService application service instance
   */
  constructor(private applicationService: ApplicationService) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.applicationService.getApplicationStats().subscribe((stats: StatsModel) => this.stats = stats);
  }
}
