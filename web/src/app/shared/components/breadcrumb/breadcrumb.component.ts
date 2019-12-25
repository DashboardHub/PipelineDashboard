import { Component, Input, OnInit } from '@angular/core';
import { ProjectModel } from '@app/shared/models/index.model';

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

ngOnInit(): void {
  this.typeIcon = this.project.isPrivate() ? 'lock' : 'lock_open';
}

}
