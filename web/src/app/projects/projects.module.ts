import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub routing modules
import { SharedModule } from '../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';

// Dashboard hub components
import { CreateEditProjectComponent } from './create-edit/create-edit.component';
import { RepositoryComponent } from './repository/repository.component';
import { ViewProjectComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  declarations: [
    CreateEditProjectComponent,
    RepositoryComponent,
    ViewProjectComponent]
})
export class ProjectsModule { }
