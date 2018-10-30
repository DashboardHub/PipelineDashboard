import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { MainComponent } from './main.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { EnvironmentsAddComponent } from './environments/add/environments-add.component';
import { EnvironmentsEditComponent } from './environments/edit/environments-edit.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';
import { EnvironmentsListPrivateComponent } from './environments/list/private/environments-list-private.component';
import { EnvironmentsReleasesComponent } from './environments/releases/environments-releases.component';
import { EnvironmentsViewPublicComponent } from './environments/view/public/environments-view-public.component';
import { EnvironmentsViewPrivateComponent } from './environments/view/private/environments-view-private.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { TermsConditionsComponent } from './legal/terms-conditions/terms-conditions.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';

import { PublicEnvironmentsResolver } from '../services/public.environments.resolver';
import { PrivateEnvironmentResolver } from '../services/private.environment.resolver';
import { PublicEnvironmentResolver } from '../services/public.environment.resolver';
import { PrivateEnvironmentsResolver } from '../services/private.environments.resolver';
import { ReleasesResolver } from '../services/releases.resolve';
import { TokensResolver } from '../services/tokens.resolver';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: EnvironmentsListPublicComponent,
                resolve: { environments: PublicEnvironmentsResolver }
            },
            {
                path: 'callback',
                pathMatch: 'full',
                component: CallbackComponent
            },
            {
                path: 'environments',
                canActivate: [AuthGuard],
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
                        component: EnvironmentsAddComponent
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
                        resolve: {
                            releases: ReleasesResolver,
                            tokens: TokensResolver,
                            environment: PrivateEnvironmentResolver
                        }
                    }
                ]
            },
            {
                path: 'environments/:id/view',
                pathMatch: 'full',
                component: EnvironmentsViewPublicComponent,
                resolve: { environment: PublicEnvironmentResolver }
            },
            {
                path: 'features',
                pathMatch: 'full',
                component: FeaturesComponent
            },
            {
                path: 'help',
                pathMatch: 'full',
                component: HelpComponent
            },
            {
                path: 'terms-and-conditions',
                pathMatch: 'full',
                component: TermsConditionsComponent
            },
            {
                path: 'privacy',
                pathMatch: 'full',
                component: PrivacyComponent
            },
            { path: '**', redirectTo: '/' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutesModule {
}
