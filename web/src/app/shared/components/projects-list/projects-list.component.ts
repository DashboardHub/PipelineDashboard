import { Component, Input, OnChanges } from '@angular/core';

// Dashboard hub model
import { PingService } from '../../../core/services/index.service';
import { PingModel, ProjectModel } from '../../models/index.model';

@Component({
  selector: 'dashboard-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnChanges {

  @Input()
  public projects: ProjectModel[] = [];
  public pingCount: [];

  constructor(private pingService: PingService) { }

  ngOnChanges(): void {
    this.projects.forEach((project: ProjectModel) => {
      this.pingService.findAllPingsCount(project.uid).subscribe((data: PingModel[]) => project.pingCount = data.length);
    });
  }
}
