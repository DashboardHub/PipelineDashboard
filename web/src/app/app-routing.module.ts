// Core modules
import { NgModule } from '@angular/core';

// Dashboard hub core modules
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
