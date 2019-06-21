import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard hub components
import { EditMonitorResolver } from '../core/resolvers/edit-monitor.resolver';
import { PublicMonitorsComponent } from '../sharedmonitor/components/public/public.component';
import { CreateEditMonitorComponent } from './create-edit/create-edit.component';

import { ViewMonitorResolver } from '../core/resolvers/view-monitor.resolver';
import { ViewMonitorComponent } from './view/view.component';

// Dashboard hub authentication guards
import { AuthGuard } from '../core/guards/authentication.guard';
 
const routes: Routes = [
  { 
    path: '',  
    component: PublicMonitorsComponent,  
    canActivate: [AuthGuard],
  },  
  { 
    path: 'create',
    component: CreateEditMonitorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':uid',
    component: ViewMonitorComponent,
    resolve: { monitor: ViewMonitorResolver },
  },
  {
    path: ':uid/edit',
    component: CreateEditMonitorComponent,
    resolve: { monitor: EditMonitorResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorsRoutingModule { }
