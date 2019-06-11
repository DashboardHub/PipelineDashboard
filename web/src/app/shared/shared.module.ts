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
import { ProjectsComponent } from './components/projects/projects.component';
import { PublicProjectsComponent } from './components/public/public.component';
import { DialogConfirmationComponent } from './dialog/confirmation/dialog-confirmation.component';
import { DialogListComponent } from './dialog/list/dialog-list.component';
import { DialogMarkdownComponent } from './dialog/markdown/dialog-markdown.component';
import { MarkdownDirective } from './directives/markdown.directive';

@NgModule({
  declarations: [
    MarkdownDirective,
    DialogConfirmationComponent,
    DialogListComponent,
    DialogMarkdownComponent,
    ProjectsComponent,
    PublicProjectsComponent],
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
    ProjectsComponent,
    PublicProjectsComponent],
  entryComponents: [
    DialogConfirmationComponent,
    DialogListComponent,
    DialogMarkdownComponent,
  ],
})
export class SharedModule { }
