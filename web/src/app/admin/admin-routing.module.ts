// Core modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// DashboardHub components
import { AdminGuard } from '@app/core/guards/admin.guard';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
