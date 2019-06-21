import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub routing modules
import { SharedModule } from '../../shared/shared.module';
import { TokensRoutingModule } from './tokens-routing.module';

// Dashboard hub components
import { CreateEditProjectTokenComponent } from './create-edit/create-edit.component';
import { ProjectTokensComponent } from './tokens.component';

@NgModule({
  imports: [
    CommonModule,
    TokensRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreateEditProjectTokenComponent,
    ProjectTokensComponent,
  ],
})
export class TokensModule { }
