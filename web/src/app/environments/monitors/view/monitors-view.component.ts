import { Component } from '@angular/core';
import { Environment } from '../../environment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from '../monitor.service';
import { Pinged } from '../pinged.model';
import { List } from '../../../list';
import { PingedService } from '../pinged.service';
import { Monitor } from '../monitor.model';

@Component({
  selector: 'qs-monitors-view',
  templateUrl: './monitors-view.component.html',
})
export class MonitorsViewComponent {

  public environment: Environment;
  public monitor: Monitor;
  public pings: List<Pinged> = new List<Pinged>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private monitorService: MonitorService,
    private pingedService: PingedService,
  ) {
    this.environment = this.route.snapshot.data.environment;
    this.pings = this.route.snapshot.data.pings;
    this.monitor = this.environment.monitors
      .find((monitor: Monitor) => monitor.id === this.route.snapshot.params.monitorId);
  }

  ping(): void {
    this.pingedService
      .ping(this.environment.id, this.monitor.id).subscribe(() => this.refresh());
  }

  refresh(): void {
    this.pingedService
      .findAll(this.environment.id, this.monitor.id).subscribe((pings: List<Pinged>) => this.pings = pings);
  }

  delete(): void {
    this.monitorService
      .delete(this.environment.id, this.monitor.id)
      .subscribe(() => this.router.navigate(['/environments', this.environment.id, 'monitors']));
  }
}
