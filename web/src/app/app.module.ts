import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';

import { CovalentHttpModule } from '@covalent/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';

import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentSearchModule } from '@covalent/core';
import { HelpDialogComponent } from './help/dialog/help-dialog.component';
import { MatDialogModule } from '@angular/material';
import {ProjectsListComponent} from "./projects/list/projects-list.component";
import {ProfileComponent} from "./profile/profile.component";
import {EnvironmentsListComponent} from "./environments/list/environments-list.component";
import {EnvironmentsAddComponent} from "./environments/add/environments-add.component";
import {EnvironmentsEditComponent} from "./environments/edit/environments-edit.component";
import { EnvironmentsReleasesComponent } from "./environments/releases/environments-releases.component";
import { EnvironmentsTokensComponent } from "./environments/tokens/environments-tokens.component";
import { MonitorsListComponent } from "./environments/monitors/list/monitors-list.component";
import { MonitorsViewComponent } from "./environments/monitors/view/monitors-view.component";
import { EnvironmentsViewComponent } from "./environments/view/environments-view.component";
import { ProjectsAddComponent } from "./projects/add/projects-add.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    EnvironmentsListComponent,
    EnvironmentsAddComponent,
    EnvironmentsEditComponent,
    EnvironmentsReleasesComponent,
    EnvironmentsTokensComponent,
    EnvironmentsViewComponent,
    MonitorsListComponent,
    MonitorsViewComponent,
    ProjectsAddComponent,
    FeaturesComponent,
    HelpComponent,
    HelpDialogComponent,
    ProjectsListComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentHttpModule.forRoot(),
    CovalentMarkdownModule,
    CovalentSearchModule,
    NgxChartsModule,
    appRoutes,
  ],
  providers: [
    Title,
  ],
  entryComponents: [
    HelpDialogComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
