import { Routes, RouterModule } from '@angular/router';
import { TokensResolver } from './environments/tokens/tokens.resolver';

import { MainComponent } from './main.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { ProjectsListComponent } from './projects/list/projects-list.component';
import { EnvironmentsAddComponent } from './environments/add/environments-add.component';
import { EnvironmentsEditComponent } from './environments/edit/environments-edit.component';
import { EnvironmentsReleasesComponent } from './environments/releases/environments-releases.component';
import { EnvironmentsTokensComponent } from './environments/tokens/environments-tokens.component';
import { MonitorsListComponent } from './environments/monitors/list/monitors-list.component';
import { MonitorsViewComponent } from './environments/monitors/view/monitors-view.component';
import { LoginComponent } from './auth/login/login.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { EnvironmentsListPrivateComponent } from './environments/list/private/environments-list-private.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';
import { PublicEnvironmentsResolver } from './environments/list/public/public.environments.resolver';
import { PrivateEnvironmentsResolver } from './environments/list/private/private.environments.resolver';
import { ProfileResolver } from './auth/profile/profile.resolver';
import { EnvironmentsViewPrivateComponent } from './environments/view/private/environments-view-private.component';
import { PrivateEnvironmentResolver } from './environments/view/private/private.environment.resolver';
import { PublicEnvironmentResolver } from './environments/view/public/public.environment.resolver';
import { EnvironmentsViewPublicComponent } from './environments/view/public/environments-view-public.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'features',
        pathMatch: 'full',
        component: FeaturesComponent,
      },
      {
        path: 'help',
        pathMatch: 'full',
        component: HelpComponent,
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'callback',
        pathMatch: 'full',
        component: CallbackComponent,
      },
      {
        path: 'environments',
        canActivate: [AuthGuard],
        resolve: { profile: ProfileResolver },
        children: [
          {
            path: 'list',
            pathMatch: 'full',
            component: EnvironmentsListPrivateComponent,
            resolve: { environments: PrivateEnvironmentsResolver }
          },
          {
            path: 'add',
            pathMatch: 'full',
            component: EnvironmentsAddComponent,
          },
          {
            path: ':id',
            pathMatch: 'full',
            component: EnvironmentsViewPrivateComponent,
            resolve: { environment: PrivateEnvironmentResolver }
          },
          {
            path: ':id/edit',
            pathMatch: 'full',
            component: EnvironmentsEditComponent,
            resolve: { environment: PrivateEnvironmentResolver }
          },
          {
            path: ':id/releases',
            pathMatch: 'full',
            component: EnvironmentsReleasesComponent,
          },
          {
            path: ':id/tokens',
            pathMatch: 'full',
            component: EnvironmentsTokensComponent,
            resolve: { tokens: TokensResolver }
          },
          {
            path: ':id/monitors',
            pathMatch: 'full',
            component: MonitorsListComponent,
          },
          {
            path: ':id/monitors/:monitorId',
            pathMatch: 'full',
            component: MonitorsViewComponent,
          },
        ]
      },
      {
        path: 'environments/:id/view',
        pathMatch: 'full',
        component: EnvironmentsViewPublicComponent,
        resolve: { environment: PublicEnvironmentResolver }
      },
      {
        path: 'projects',
        pathMatch: 'full',
        component: ProjectsListComponent,
        resolve: { profile: ProfileResolver },
      },
      {
        path: 'profile',
        pathMatch: 'full',
        component: ProfileComponent,
        resolve: { profile: ProfileResolver },
      },
      {
        path: '',
        component: EnvironmentsListPublicComponent,
        resolve: { environments: PublicEnvironmentsResolver }
      },
      { path: '**', redirectTo: '/' }
    ],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
