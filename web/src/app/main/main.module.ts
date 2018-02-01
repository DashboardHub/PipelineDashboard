import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { environment } from '../../environments/environment';
import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { FuseNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './quick-panel/quick-panel.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';
import { LoginComponent } from "./content/auth/login/login.component";
import { AuthService } from "./content/auth/auth.service";
import { PricingComponent } from "./content/pricing/pricing.component";
import { CallbackComponent } from "./content/auth/callback/callback.component";
import { ProfileResolver } from "./content/auth/profile.resolver";
import { ProfileComponent } from "./content/auth/profile/profile.component";
import { AuthGuard } from "./content/auth/auth.guard";
import { EnvironmentAddComponent } from "./content/environment/environment-add/environment-add.component";
import { EnvironmentService } from "./content/environment/environment.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { EnvironmentListComponent } from "./content/environment/environment-list/environment-list.component";
import { PublicEnvironmentsResolver } from "./content/environment/public.environments.resolver";
import { JwtModule } from "@auth0/angular-jwt";
import { NavigationService } from "../navigation/navigation.service";
import { FuseNavigationModel } from "../navigation/navigation.model";
import { MomentModule } from "angular2-moment";
import { EnvironmentViewComponent } from "./content/environment/environment-view/environment-view.component";
import { EnvironmentViewResolver } from "./content/environment/environment-view/environment-view.resolver";
import { EnvironmentSidenavComponent } from "./content/environment/sidenav/environment-sidenav.component";
import { TokenComponent } from "./content/environment/token/token.component";
import { TokenService } from "./content/environment/token/token.service";
import { EnvironmentDeleteComponent } from "./content/environment/environment-delete/environment-delete.component";
import { EnvironmentEditComponent } from "./content/environment/environment-edit/environment-edit.component";
import { PrivateEnvironmentsResolver } from "./content/environment/private.environments.resolver";
import { DeployedComponent } from "./content/environment/deployed/deployed.component";
import { DeploysResolver } from "./content/environment/deployed/deploys.resolver";
import { DeployedService } from "./content/environment/deployed/deployed.service";
import { ErrorHttpInterceptor } from "./error.http.interceptor";
import { ReleaseComponent } from "./content/environment/deployed/release/release.component";
import { ReleasesResolver } from "./content/environment/deployed/release/releases.resolver";
import {PrivateSummaryResolver} from "./content/summary/private.summary.resolver";
import {PublicSummaryResolver} from "./content/summary/public.summary.resolver";
import {SummaryService} from "./content/summary/summary.service";
import {SummaryComponent} from "./content/summary/summary.component";
import {MonitorComponent} from "./content/environment/monitor/monitor.component";
import {PingsResolver} from "./content/environment/monitor/pinged/pings.resolver";
import {PingedService} from "./content/environment/monitor/pinged/pinged.service";
import {NgPipesModule} from "ngx-pipes";
import {FuseWidgetModule} from "../core/components/widget/widget.module";
import {FuseThemeOptionsComponent} from "../core/components/theme-options/theme-options.component";

const routes: Routes = [
  {
    path: 'public',
    pathMatch: 'full',
    component: EnvironmentListComponent,
    resolve: { profile: ProfileResolver, environments: PublicEnvironmentsResolver }
  },
  { path: 'pricing', component: PricingComponent, resolve: { profile: ProfileResolver } },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: { profile: ProfileResolver, summary: PrivateSummaryResolver } },
  {
    path: 'environment',
    canActivate: [AuthGuard],
    resolve: { profile: ProfileResolver },
    children: [
      {
        path: 'list',
        pathMatch: 'full',
        component: EnvironmentListComponent,
        resolve: { environments: PrivateEnvironmentsResolver }
      },
      { path: 'add', pathMatch: 'full', component: EnvironmentAddComponent },
      { path: ':id/edit', pathMatch: 'full', component: EnvironmentEditComponent, resolve: { environment: EnvironmentViewResolver } },
      { path: ':id/token', pathMatch: 'full', component: TokenComponent, resolve: { environment: EnvironmentViewResolver } },
      { path: ':id/delete', pathMatch: 'full', component: EnvironmentDeleteComponent, resolve: { environment: EnvironmentViewResolver } },
      { path: ':id/deploys', pathMatch: 'full', component: DeployedComponent, resolve: { environment: EnvironmentViewResolver, deploys: DeploysResolver } },
      { path: ':id/releases', pathMatch: 'full', component: ReleaseComponent, resolve: { environment: EnvironmentViewResolver, releases: ReleasesResolver } },
      { path: ':id/monitors', pathMatch: 'full', component: MonitorComponent, resolve: { environment: EnvironmentViewResolver } },
      { path: ':id', pathMatch: 'full', component: EnvironmentViewComponent, resolve: { environment: EnvironmentViewResolver } }
    ]
  },
  { path: '**', redirectTo: '/public' }
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseQuickPanelComponent,
        FuseThemeOptionsComponent,
        CallbackComponent,
        LoginComponent,
        PricingComponent,
        ProfileComponent,
        EnvironmentAddComponent,
        EnvironmentListComponent,
        EnvironmentViewComponent,
        EnvironmentSidenavComponent,
        EnvironmentDeleteComponent,
        EnvironmentEditComponent,
        MonitorComponent,
        ReleaseComponent,
        TokenComponent,
        DeployedComponent,
        SummaryComponent
    ],
    imports     : [
        RouterModule.forRoot(
          routes,
          { enableTracing: true } // <-- debugging purposes only
        ),
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        FuseWidgetModule,
        HttpClientModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: [environment.api.split('//')[1]]
          }
        }),
        MomentModule,
        NgPipesModule
    ],
    exports     : [
        FuseMainComponent
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorHttpInterceptor, multi: true },
      AuthGuard,
      AuthService,
      DeploysResolver,
      DeployedService,
      EnvironmentService,
      PingsResolver,
      PingedService,
      ProfileResolver,
      PublicEnvironmentsResolver,
      PrivateEnvironmentsResolver,
      PrivateSummaryResolver,
      PublicSummaryResolver,
      ReleasesResolver,
      EnvironmentViewResolver,
      FuseNavigationModel,
      NavigationService,
      SummaryService,
      TokenService
    ]
})
export class FuseMainModule
{
}
