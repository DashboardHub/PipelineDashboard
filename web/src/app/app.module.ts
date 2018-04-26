import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
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

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';

import { JwtModule } from '@auth0/angular-jwt';

import { environment } from "../environments/environment";

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentSearchModule } from '@covalent/core';
import { HelpDialogComponent } from './help/dialog/help-dialog.component';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ProjectsListComponent } from "./projects/list/projects-list.component";
import { EnvironmentsListComponent } from "./environments/list/environments-list.component";
import { EnvironmentsAddComponent } from "./environments/add/environments-add.component";
import { EnvironmentsEditComponent } from "./environments/edit/environments-edit.component";
import { EnvironmentsReleasesComponent } from "./environments/releases/environments-releases.component";
import { EnvironmentsTokensComponent } from "./environments/tokens/environments-tokens.component";
import { MonitorsListComponent } from "./environments/monitors/list/monitors-list.component";
import { MonitorsViewComponent } from "./environments/monitors/view/monitors-view.component";
import { EnvironmentsViewComponent } from "./environments/view/environments-view.component";
import { ProjectsAddComponent } from "./projects/add/projects-add.component";
import { EnvironmentService } from "./environments/environment.service";
import { ApiHttpInterceptor } from "./interceptors/api.http.interceptor";
import { EnvironmentsListPublicComponent } from "./environments/list-public/environments-list-public.component";
import { EnvironmentsListPrivateComponent } from "./environments/list-private/environments-list-private.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthService } from "./auth/auth.service";
import { CallbackComponent } from "./auth/callback/callback.component";
import { ProfileComponent } from "./auth/profile/profile.component";
import { ErrorHttpInterceptor } from "./interceptors/error.http.interceptor";

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CallbackComponent,
    LoginComponent,
    DashboardComponent,
    EnvironmentsListComponent,
    EnvironmentsListPrivateComponent,
    EnvironmentsListPublicComponent,
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
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentMarkdownModule,
    CovalentSearchModule,
    NgxChartsModule,
    appRoutes,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelist
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptor,
      multi: true
    },
    AuthService,
    EnvironmentService,
    Title,
  ],
  entryComponents: [
    HelpDialogComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
