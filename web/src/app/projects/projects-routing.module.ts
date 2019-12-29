// Core modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard hub components
import { EditProjectResolver } from '@core/resolvers/edit-project.resolver';
import { CreateEditProjectComponent } from './create-edit/create-edit.component';
import { ListMyProjectsComponent } from './list/list-my-projects.component';

// Application resolvers
import { ViewProjectResolver } from '@core/resolvers/view-project.resolver';
import { ViewProjectComponent } from './view/view.component';

// Dashboard hub authentication guards
import { AuthGuard } from '@core/guards/authentication.guard';
import { MyProjectsResolver } from '@core/resolvers/my-projects.resolver';
import { RepositoryResolver } from '@core/resolvers/repository.resolver';
import { RatingComponent } from './rating/rating.component';

const routes: Routes = [
  {
    path: '',
    component: ListMyProjectsComponent,
    canActivate: [AuthGuard],
    resolve: { projects: MyProjectsResolver },
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
    resolve: { project: ViewProjectResolver, repository: RepositoryResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule { }
