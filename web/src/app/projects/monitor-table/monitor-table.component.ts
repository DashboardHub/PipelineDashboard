// Core components
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Third party modules
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { MatTableDataSource } from '@angular/material';
import { ProjectService } from '../../core/services/index.service';
import { MonitorModel, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-monitor-table',
  templateUrl: './monitor-table.component.html',
  styleUrls: ['./monitor-table.component.scss'],
})
export class MonitorTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'successfulPings', 'unsuccessfulPings', 'expectedCode', 'statusCode', 'url'];
  dataSource: MatTableDataSource<MonitorModel>;
  projectSubscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectSubscription = this.projectService
      .findOneById(this.route.snapshot.params.projectUid)
      .subscribe((project: ProjectModel) => {
        this.dataSource = new MatTableDataSource(project.monitors);
      });
  }
}
