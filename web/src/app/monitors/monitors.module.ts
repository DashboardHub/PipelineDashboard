import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub routing modules
import { SharedModule } from '../shared/shared.module';
import { MonitorsRoutingModule } from './monitors-routing.module';

// Dashboard hub components
import { CreateEditMonitorComponent } from './create-edit/create-edit.component';
import { RepositoryComponent } from './repository/repository.component';
import { ViewMonitorComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    MonitorsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreateEditMonitorComponent,
    RepositoryComponent,
    ViewMonitorComponent],
})
export class MonitorsModule { } 
