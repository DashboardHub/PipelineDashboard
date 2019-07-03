// Angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub routing modules
import { SharedModule } from '../shared/shared.module';
import { TokensRoutingModule } from './tokens-routing.module';

// Dashboard hub components
import { TokensCreateEditComponent } from './tokens-create-edit/tokens-create-edit.component';
import { TokensListComponent } from './tokens-list/tokens-list.component';

@NgModule({
  imports: [
    CommonModule,
    TokensRoutingModule,
    SharedModule,
  ],
  declarations: [
    TokensCreateEditComponent,
    TokensListComponent,
  ],
})
export class TokensModule { }
