// Core modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard hub components
import { EditProjectResolver } from '@core/resolvers/edit-project.resolver';
import { PrivatePublicProjectComponent } from '@shared/components/private-public-project/private-public-project.component';
import { CreateEditProjectComponent } from './create-edit/create-edit.component';

// Application resolvers
import { ViewProjectResolver } from '@core/resolvers/view-project.resolver';
import { ViewProjectComponent } from './view/view.component';

// Dashboard hub authentication guards
import { AuthGuard } from '@core/guards/authentication.guard';
import { RepositoryResolver } from '@core/resolvers/repository.resolver';
import { StatusResolver } from '@core/resolvers/status.resolver';
import { BuildHistoryComponent } from './build-history/build-history.component';
import { PullRequestsComponent } from './pull-requests/pull-requests.component';
import { RatingComponent } from './rating/rating.component';

const routes: Routes = [
  {
    path: '',
    component: PrivatePublicProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateEditProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':projectUid',
    component: ViewProjectComponent,
    resolve: { project: ViewProjectResolver },
  },
  {
    path: ':projectUid/edit',
    component: CreateEditProjectComponent,
    resolve: { project: EditProjectResolver },
  },
  {
    path: ':projectUid/monitors',
    loadChildren: '../monitors/monitors.module#MonitorsModule',
    canActivate: [AuthGuard],
  },
  {
    path: ':projectUid/tokens',
    loadChildren: '../tokens/tokens.module#TokensModule',
  },
  {
    path: ':projectUid/rating/:repoUid',
    component: RatingComponent,
    resolve: { repository: RepositoryResolver },
  },
  {
    path: ':projectUid/:repoUid',
    component: PullRequestsComponent,
    resolve: { repository: RepositoryResolver },
  },
  {
    path: ':projectUid/:repoUid/:pullRequestUid',
    component: BuildHistoryComponent,
    resolve: { status: StatusResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule { }
