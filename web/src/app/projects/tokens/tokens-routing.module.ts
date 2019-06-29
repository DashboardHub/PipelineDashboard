import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard hub components
import { CreateEditProjectTokenComponent } from './create-edit/create-edit.component';
import { ListProjectTokenComponent } from './list/list.component';

import { EditProjectTokenResolver } from '../../core/resolvers/edit-project-token.resolver';
import { ProjectTokensResolver } from '../../core/resolvers/project-tokens.resolver';

// Dashboard hub authentication guards
import { AuthGuard } from '../../core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: ListProjectTokenComponent,
    canActivate: [AuthGuard],
    resolve: { tokens: ProjectTokensResolver },
  },
  {
    path: 'create',
    component: CreateEditProjectTokenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':uid/edit',
    component: CreateEditProjectTokenComponent,
    canActivate: [AuthGuard],
    resolve: { token: EditProjectTokenResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokensRoutingModule { }
