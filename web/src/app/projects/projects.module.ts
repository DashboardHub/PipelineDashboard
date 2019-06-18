import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub routing modules
import { SharedModule } from '../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';

// Dashboard hub components
import { CreateEditProjectComponent } from './create-edit/create-edit.component';
import { CreateEditTokenComponent } from './create-edit-token/create-edit-token.component';

import { RepositoryComponent } from './repository/repository.component';
import { ViewProjectComponent } from './view/view.component';
import { TokensProjectComponent } from './tokens/tokens.component';


@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreateEditProjectComponent,
	CreateEditTokenComponent,
	TokensProjectComponent,
    RepositoryComponent,
    ViewProjectComponent],
})
export class ProjectsModule { }
