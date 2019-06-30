import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard hub components
import { EditProjectResolver } from '../core/resolvers/edit-project.resolver';
import { MonitorCreateEditComponent } from './monitor-create-edit/monitor-create-edit.component';
import { MonitorsListComponent } from './monitors-list/monitors-list.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorsListComponent,
  },
  {
    path: 'create',
    component: MonitorCreateEditComponent,
  },
  {
    path: ':monitorUid',
    component: MonitorCreateEditComponent,
    resolve: { project: EditProjectResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorsRoutingModule { }
