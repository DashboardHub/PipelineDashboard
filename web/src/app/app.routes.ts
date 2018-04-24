import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { ProjectsListComponent } from "./projects/list/projects-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { EnvironmentsListComponent } from "./environments/list/environments-list.component";
import { EnvironmentsAddComponent } from "./environments/add/environments-add.component";
import { EnvironmentsEditComponent } from "./environments/edit/environments-edit.component";
import { EnvironmentsReleasesComponent } from "./environments/releases/environments-releases.component";
import { EnvironmentsTokensComponent } from "./environments/tokens/environments-tokens.component";
import { MonitorsListComponent } from "./environments/monitors/list/monitors-list.component";
import { MonitorsViewComponent } from "./environments/monitors/view/monitors-view.component";
import { EnvironmentsViewComponent } from "./environments/view/environments-view.component";
import { ProjectsAddComponent } from "./projects/add/projects-add.component";

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
        path: 'environments',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: EnvironmentsListComponent,
          },
          {
            path: 'add',
            pathMatch: 'full',
            component: EnvironmentsAddComponent,
          },
          {
            path: ':id',
            pathMatch: 'full',
            component: EnvironmentsViewComponent,
          },
          {
            path: ':id/edit',
            pathMatch: 'full',
            component: EnvironmentsEditComponent,
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
        path: 'projects',
        pathMatch: 'full',
        component: ProjectsListComponent,
      },
      {
        path: 'projects/add',
        pathMatch: 'full',
        component: ProjectsAddComponent,
      },
      {
        path: 'profile',
        pathMatch: 'full',
        component: ProfileComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      },
      { path: '**', redirectTo: '/' }
    ],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
