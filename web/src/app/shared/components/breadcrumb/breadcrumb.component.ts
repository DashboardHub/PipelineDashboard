// Core modules
import { Component, Input, OnInit } from '@angular/core';

// DashboardHub Models
import { BreadCrumbModel, ProjectModel } from '@shared/models/index.model';

/**
 * Breadcrumb component
 */
@Component({
  selector: 'dashboard-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {

  public typeIcon: string;

  @Input() project: ProjectModel;
  @Input() isSmallScreen: Boolean;
  @Input() subTitle: string;
  @Input() breadCrumb: BreadCrumbModel[];

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.typeIcon = this.project.isPrivate() ? 'lock' : 'lock_open';
  }

}
