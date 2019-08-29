// Core components
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Application component
import { SharedModule } from '@app/shared/shared.module';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    SharedModule,
  ],
})
export class ErrorModule { }
