import { NgModule } from '@angular/core';

// Dashboard hub core modules
import { RouterModule, Routes } from '@angular/router';
import { AuthResolver } from '../core/resolvers/auth.resolver';
import { BaseComponent } from './base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    resolve: [AuthResolver],
    children: [
      {
        path: '',
        loadChildren: '../main/main.module#MainModule',
      },
      {
        path: 'projects',
        loadChildren: '../projects/projects.module#ProjectsModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule { }
