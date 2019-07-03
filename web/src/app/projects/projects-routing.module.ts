import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard hub components
import { EditProjectResolver } from '../core/resolvers/edit-project.resolver';
import { PrivatePublicProjectComponent } from '../shared/components/private-public-project/private-public-project.component';
import { CreateEditProjectComponent } from './create-edit/create-edit.component';

import { ViewProjectResolver } from '../core/resolvers/view-project.resolver';
import { ViewProjectComponent } from './view/view.component';

// Dashboard hub authentication guards
import { AuthGuard } from '../core/guards/authentication.guard';

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
  },
  {
    path: ':projectUid/tokens',
    loadChildren: '../tokens/tokens.module#TokensModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule { }
