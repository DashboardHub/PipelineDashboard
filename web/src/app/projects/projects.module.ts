import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dashboard hub routing modules
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';

// Dashboard hub components
import { ViewProjectComponent } from './view/view.component';
import { RepositoryComponent } from './repository/repository.component';
import { PrivateProjectsComponent } from './private/private.component';
import { EditProjectComponent } from './edit/edit.component';
import { CreateProjectComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  declarations: [
    CreateProjectComponent,
    EditProjectComponent,
    PrivateProjectsComponent,
    RepositoryComponent,
    ViewProjectComponent]
})
export class ProjectsModule { }
