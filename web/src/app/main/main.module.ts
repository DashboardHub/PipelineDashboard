import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

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

const routes: Routes = [
  // {
  //   path: 'environments',
  //   pathMatch: 'full',
  //   component: EnvironmentListComponent,
  //   resolve: { environments: EnvironmentsResolver }
  //   // resolve: { summary: EnvironmentsSummaryPublicResolver, environments: EnvironmentsResolver, profile: ProfileResolver }
  // },
  { path: 'pricing', component: PricingComponent, resolve: { profile: ProfileResolver } },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: { profile: ProfileResolver } },
  // {
  //   path: 'environments',
  //   canActivate: [AuthGuard],
  //   resolve: { profile: ProfileResolver },
  //   children: [
  //     {
  //       path: '',
  //       pathMatch: 'full',
  //       component: EnvironmentListComponent,
  //       resolve: { summary: EnvironmentsSummaryPrivateResolver, environments: EnvironmentsListResolver }
  //     },
  //     {
  //       path: 'list',
  //       pathMatch: 'full',
  //       component: EnvironmentListComponent,
  //       resolve: { summary: EnvironmentsSummaryPrivateResolver, environments: EnvironmentsListResolver }
  //     },
  //     { path: 'add', pathMatch: 'full', component: EnvironmentAddComponent },
  //     { path: ':id/edit', pathMatch: 'full', component: EnvironmentEditComponent, resolve: { environment: EnvironmentViewResolver } },
  //     { path: ':id', pathMatch: 'full', component: EnvironmentViewComponent, resolve: { environment: EnvironmentViewResolver } }
  //   ]
  // },
  { path: '**', redirectTo: '/' }
];

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
        CallbackComponent,
        LoginComponent,
        PricingComponent,
        ProfileComponent
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
        FuseSearchBarModule
    ],
    exports     : [
        FuseMainComponent
    ],
    providers: [
      AuthGuard,
      AuthService,
      ProfileResolver
    ]
})

export class FuseMainModule
{
}
