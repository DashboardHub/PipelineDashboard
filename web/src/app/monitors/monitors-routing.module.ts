// Core modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard hub components
import { EditProjectResolver } from '@core/resolvers/edit-project.resolver';
import { PingsResolver } from '@core/resolvers/pings.resolver';
import { ViewProjectResolver } from '@core/resolvers/view-project.resolver';
import { MonitorCreateEditComponent } from './monitor-create-edit/monitor-create-edit.component';
import { MonitorsListComponent } from './monitors-list/monitors-list.component';
import { PingsListComponent } from './pings-list/pings-list.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorsListComponent,
    resolve: { project: ViewProjectResolver },
  },
  {
    path: 'create',
    component: MonitorCreateEditComponent,
    resolve: { project: EditProjectResolver },
  },
  {
    path: ':monitorUid',
    component: MonitorCreateEditComponent,
    resolve: { project: EditProjectResolver },
  },
  {
    path: ':monitorUid/pings',
    component: PingsListComponent,
    resolve: { pings: PingsResolver, project: ViewProjectResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorsRoutingModule { }
