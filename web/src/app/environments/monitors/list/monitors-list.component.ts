import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Environment } from '../../environment.model';
import { Monitor } from '../monitor.model';
import { List } from '../../../list';
import { MonitorService } from '../monitor.service';
import { Subscription } from 'rxjs/index';
import { Observable } from '../../../../../node_modules/rxjs/Rx';

@Component({
  selector: 'qs-monitors-list',
  templateUrl: './monitors-list.component.html',
})
export class MonitorsListComponent implements OnDestroy {

  private subscription: Subscription;

  public environment: Environment;
  public monitors: List<Monitor>;

  constructor(private route: ActivatedRoute, private monitorService: MonitorService) {
    this.environment = this.route.snapshot.data.environment;
    this.monitors = this.route.snapshot.data.monitors;
    this.subscription = Observable.interval(30000).takeWhile(() => true).subscribe(() =>  this.refresh());
  }

  refresh(): void {
    this.monitorService
      .findAll(this.environment.id)
      .subscribe((monitors: List<Monitor>) => this.monitors = monitors);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
