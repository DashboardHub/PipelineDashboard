// Core components
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub monitor module and components
import { SharedModule } from '../shared/shared.module';
import { MonitorCreateEditComponent } from './monitor-create-edit/monitor-create-edit.component';
import { MonitorsListComponent } from './monitors-list/monitors-list.component';
import { MonitorsRoutingModule } from './monitors-routing.module';
import { PingsListComponent } from './pings-list/pings-list.component';

@NgModule({
  declarations: [MonitorsListComponent, MonitorCreateEditComponent, PingsListComponent],
  imports: [
    CommonModule,
    MonitorsRoutingModule,
    SharedModule,
  ],
})
export class MonitorsModule { }
