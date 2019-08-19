// Core modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Application modules and components
import { SharedModule } from '../shared/shared.module';
import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    SharedModule,
    BaseRoutingModule,
  ],
})
export class BaseModule { }
