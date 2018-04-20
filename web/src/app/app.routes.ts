import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [{
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
      path: '',
      component: DashboardComponent,
    },
  ],
},
];

export const appRoutes: any = RouterModule.forRoot(routes);
