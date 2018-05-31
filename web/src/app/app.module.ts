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

import { environment } from '../environments/environment';
import { TokenService } from './environments/tokens/token.service';
import { TokensResolver } from './environments/tokens/tokens.resolver';

import { MainComponent } from './main.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentSearchModule } from '@covalent/core';
import { MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { ProjectsListComponent } from './projects/list/projects-list.component';
import { EnvironmentsListComponent } from './environments/list/environments-list.component';
import { EnvironmentsAddComponent } from './environments/add/environments-add.component';
import { EnvironmentsEditComponent } from './environments/edit/environments-edit.component';
import { EnvironmentsReleasesComponent } from './environments/releases/environments-releases.component';
import { EnvironmentsTokensComponent } from './environments/tokens/environments-tokens.component';
import { MonitorsListComponent } from './environments/monitors/list/monitors-list.component';
import { MonitorsViewComponent } from './environments/monitors/view/monitors-view.component';
import { EnvironmentsViewComponent } from './environments/view/environments-view.component';
import { ProjectsAddComponent } from './projects/add/projects-add.component';
import { EnvironmentService } from './environments/environment.service';
import { ApiHttpInterceptor } from './interceptors/api.http.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './auth/callback/callback.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ErrorHttpInterceptor } from './interceptors/error.http.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { PublicEnvironmentsResolver } from './environments/list/public/public.environments.resolver';
import { EnvironmentsListPrivateComponent } from './environments/list/private/environments-list-private.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';
import { PrivateEnvironmentsResolver } from './environments/list/private/private.environments.resolver';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { ProfileResolver } from './auth/profile/profile.resolver';
import { PrivateEnvironmentResolver } from './environments/view/private/private.environment.resolver';
import { EnvironmentsViewPrivateComponent } from './environments/view/private/environments-view-private.component';
import { PublicEnvironmentResolver } from './environments/view/public/public.environment.resolver';
import { EnvironmentsViewPublicComponent } from './environments/view/public/environments-view-public.component';
import { MonitorsResolver } from './environments/monitors/monitors.resolve';
import { MonitorService } from './environments/monitors/monitor.service';
import { MonitorsAddComponent } from './environments/monitors/add/monitors-add.component';
import { CovalentMessageModule } from '@covalent/core';
import { PingedService } from './environments/monitors/pinged.service';
import { PingsResolver } from './environments/monitors/pings.resolve';
import { LogoutComponent } from './auth/logout/logout.component';
import { EnvironmentTypePipe } from './environments/type.pipe';
import { ReleaseStatePipe } from './environments/releases/state.pipe';
import { TermsConditionsComponent } from './legal/terms-conditions/terms-conditions.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { DialogMarkdownComponent } from './dialog/markdown/dialog-markdown.component';
import { DialogConfirmationComponent } from './dialog/confirmation/dialog-confirmation.component';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

export function tokenGetter(): string | null {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CallbackComponent,
    DialogConfirmationComponent,
    DialogMarkdownComponent,
    EnvironmentsListComponent,
    EnvironmentsListPrivateComponent,
    EnvironmentsListPublicComponent,
    EnvironmentsAddComponent,
    EnvironmentsEditComponent,
    EnvironmentsReleasesComponent,
    EnvironmentTypePipe,
    EnvironmentsTokensComponent,
    EnvironmentsViewComponent,
    EnvironmentsViewPrivateComponent,
    EnvironmentsViewPublicComponent,
    FeaturesComponent,
    HelpComponent,
    LoginComponent,
    LogoutComponent,
    MonitorsAddComponent,
    MonitorsListComponent,
    MonitorsViewComponent,
    PrivacyComponent,
    ProjectsAddComponent,
    ProjectsListComponent,
    ProfileComponent,
    ReleaseStatePipe,
    TermsConditionsComponent,
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
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    CovalentCommonModule,
    CovalentDynamicFormsModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentMarkdownModule,
    CovalentMessageModule,
    CovalentSearchModule,
    NgxChartsModule,
    appRoutes,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelist,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptor,
      multi: true,
    },
    AuthGuard,
    AuthService,
    EnvironmentService,
    MonitorsResolver,
    MonitorService,
    PingedService,
    PingsResolver,
    ProfileResolver,
    PrivateEnvironmentsResolver,
    PublicEnvironmentsResolver,
    PrivateEnvironmentResolver,
    PublicEnvironmentResolver,
    TokensResolver,
    TokenService,
    Title,
  ],
  entryComponents: [
    DialogConfirmationComponent,
    DialogMarkdownComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
