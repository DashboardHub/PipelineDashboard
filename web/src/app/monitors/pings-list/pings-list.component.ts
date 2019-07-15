import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

// Dashboard hub models
import { PingModel } from '../../shared/models/index.model';

/**
 * Ping list components
 */
@Component({
  selector: 'dashboard-pings-list',
  templateUrl: './pings-list.component.html',
  styleUrls: ['./pings-list.component.scss'],
})
export class PingsListComponent implements OnInit {

  public pings: PingModel[];
  public projectUid: string;
  public monitorUid: string;

  constructor(private route: ActivatedRoute) { }

  /**
   * Lifecycle init method
   */
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.monitorUid = this.route.snapshot.paramMap.get('monitorUid');
    this.route.data
      .pipe(
        take(1)
      )
      .subscribe((pings: PingModel[]) => {
        this.pings = pings;
      });
  }
}
