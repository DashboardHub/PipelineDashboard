import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dashboard hub routing modules
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';

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
