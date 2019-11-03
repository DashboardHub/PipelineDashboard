// Core modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub routing modules
import { SharedModule } from '@shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';

// Dashboard hub components
import { BuildHistoryComponent } from './build-history/build-history.component';
import { CreateEditProjectComponent } from './create-edit/create-edit.component';
import { MonitorSummaryComponent } from './monitor-summary/monitor-summary.component';
import { PullRequestsComponent } from './pull-requests/pull-requests.component';
import { RatingComponent } from './rating/rating.component';
import { RepositoryComponent } from './repository/repository.component';
import { ViewProjectComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreateEditProjectComponent,
    MonitorSummaryComponent,
    RepositoryComponent,
    ViewProjectComponent,
    RatingComponent,
    PullRequestsComponent,
    BuildHistoryComponent,
  ],
})
export class ProjectsModule { }
