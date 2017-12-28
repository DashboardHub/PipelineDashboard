import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { EnvironmentsComponent } from './environments/environments.component';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import {
  MatToolbarModule,
  MatChipsModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule, MatButtonModule, MatInputModule, MatTooltipModule, MatSnackBarModule, MatProgressBarModule,
  MatTabsModule, MatMenuModule, MatFormFieldModule, MatRadioModule, MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CovalentCommonModule, CovalentDialogsModule, CovalentMessageModule,
  CovalentNotificationsModule
} from '@covalent/core';
import { EnvironmentAddComponent } from './environments/environment-add/environment-add.component';
import { EnvironmentViewComponent } from './environments/environment-view/environment-view.component';
import { EnvironmentEditComponent } from './environments/environment-edit/environment-edit.component';
import { AuthService } from "./auth/auth.service";
import { CallbackComponent } from "./auth/callback.component";
import { ProfileComponent } from "./auth/profile/profile.component";
import { AuthGuard } from "./auth/auth.guard";

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { EnvironmentListComponent } from "./environments/environment-list/environment-list.component";
import { TokenAddComponent } from "./environments/tokens/token-add/token-add.component";
import { TokenListComponent } from "./environments/tokens/token-list/token.list.component";
import { TokenComponent } from "./environments/tokens/token.component";
import { DeployedListComponent } from "./environments/deployed/deployed-list/deployed.list.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { EnvironmentsSummaryComponent } from "./environments/summary/environments-summary.component";
import { EnvironmentsService } from "./environments/environments.service";
import { EnvironmentsSummaryPublicResolver } from "./environments/summary/environments-summary.public.resolver";
import { EnvironmentsSummaryPrivateResolver } from "./environments/summary/environments-summary.private.resolver";
import { FlexLayoutModule } from "@angular/flex-layout";
import { EnvironmentsResolver } from "./environments/environments.resolver";
import { EnvironmentsListResolver } from "./environments/environment-list/environments-list.resolver";
import { EnvironmentViewResolver } from "./environments/environment-view/environment-view.resolver";
import { ProfileResolver } from "./auth/profile.resolver";
import { DeployedSummaryComponent } from "./environments/deployed/deployed-summary/deployed-summary.component";
import { PricingComponent } from "./pricing/pricing.component";
import { DeployedAddComponent } from "./environments/deployed/deployed-add/deployed-add.component";
import { TokensService } from "./environments/tokens/tokens.service";
import { DeployedService } from "./environments/deployed/deployed.service";
import { MonitorListComponent } from "./environments/monitors/monitor-list/monitor-list.component";
import { MonitorService } from "./environments/monitors/monitors.service";
import { MonitorAddComponent } from "./environments/monitors/monitor-add/monitor-add.component";
import { PingedListComponent } from "./environments/monitors/pinged-list/pinged-list.component";
import { PingedService } from "./environments/monitors/pinged-list/pinged.service";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type':'application/json'}]
  }), http, options);
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EnvironmentsComponent,
    resolve: { summary: EnvironmentsSummaryPublicResolver, environments: EnvironmentsResolver, profile: ProfileResolver }
  },
  { path: 'pricing', component: PricingComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: { profile: ProfileResolver } },
  {
    path: 'environments',
    canActivate: [AuthGuard],
    resolve: { profile: ProfileResolver },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EnvironmentListComponent,
        resolve: { summary: EnvironmentsSummaryPrivateResolver, environments: EnvironmentsListResolver }
      },
      {
        path: 'list',
        pathMatch: 'full',
        component: EnvironmentListComponent,
        resolve: { summary: EnvironmentsSummaryPrivateResolver, environments: EnvironmentsListResolver }
      },
      { path: 'add', pathMatch: 'full', component: EnvironmentAddComponent },
      { path: ':id/edit', pathMatch: 'full', component: EnvironmentEditComponent, resolve: { environment: EnvironmentViewResolver } },
      { path: ':id', pathMatch: 'full', component: EnvironmentViewComponent, resolve: { environment: EnvironmentViewResolver } }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    EnvironmentsComponent,
    EnvironmentAddComponent,
    EnvironmentViewComponent,
    EnvironmentEditComponent,
    EnvironmentListComponent,
    EnvironmentsSummaryComponent,
    TokenComponent,
    TokenAddComponent,
    TokenListComponent,
    DeployedListComponent,
    DeployedSummaryComponent,
    DeployedAddComponent,
    ProfileComponent,
    PricingComponent,
    MonitorListComponent,
    MonitorAddComponent,
    PingedListComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    CovalentMessageModule,
    HttpModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    NgxChartsModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    CovalentDialogsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    DeployedService,
    EnvironmentsService,
    EnvironmentsResolver,
    EnvironmentViewResolver,
    EnvironmentsListResolver,
    EnvironmentsSummaryPublicResolver,
    EnvironmentsSummaryPrivateResolver,
    ProfileResolver,
    TokensService,
    MonitorService,
    PingedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
