import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Third party module
import { FlexLayoutModule } from '@angular/flex-layout';

// Dashboard hub App modules
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { PipesModule } from '../pipes/pipes.module';

// Dashboard hub components
import { PrivatePublicProjectComponent } from './components/private-public-project/private-public-project.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { DialogConfirmationComponent } from './dialog/confirmation/dialog-confirmation.component';
import { DialogListComponent } from './dialog/list/dialog-list.component';
import { MarkdownComponent } from './dialog/markdown/markdown.component';
import { MarkdownDirective } from './directives/markdown.directive';

@NgModule({
  declarations: [
    MarkdownDirective,
    DialogConfirmationComponent,
    DialogListComponent,
    MarkdownComponent,
    ProjectsListComponent,
    PrivatePublicProjectComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule,
    RouterModule.forChild([]),
    ReactiveFormsModule,
    PipesModule],
  exports: [
    FlexLayoutModule,
    AppMaterialModule,
    ReactiveFormsModule,
    PipesModule,
    MarkdownDirective,
    RouterModule,
    ProjectsListComponent,
    PrivatePublicProjectComponent],
  entryComponents: [
    DialogConfirmationComponent,
    DialogListComponent,
  ],
})
export class SharedModule { }
