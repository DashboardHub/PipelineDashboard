// Angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub routing modules
import { SharedModule } from '../../shared/shared.module';
import { TokensRoutingModule } from './tokens-routing.module';

// Dashboard hub components
import { CreateEditProjectTokenComponent } from './create-edit/create-edit.component';
import { ListProjectTokenComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    TokensRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreateEditProjectTokenComponent,
    ListProjectTokenComponent,
  ],
})
export class TokensModule { }
