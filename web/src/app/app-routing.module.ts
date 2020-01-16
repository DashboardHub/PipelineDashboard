// Core modules
import { NgModule } from '@angular/core';

// Dashboard hub core modules
import { RouterModule, Routes } from '@angular/router';
import { AuthResolver } from '@core/resolvers/auth.resolver';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    resolve: [AuthResolver],
    children: [
      {
        path: '',
        loadChildren: './main/main.module#MainModule',
      },
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule',
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
      },
      {
        path: '**',
        loadChildren: './error/error.module#ErrorModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
