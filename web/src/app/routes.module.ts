import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { MainComponent } from './main.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { EnvironmentsAddComponent } from './environments/add/environments-add.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';
import { EnvironmentsListPrivateComponent } from './environments/list/private/environments-list-private.component';
import { PublicEnvironmentsResolver } from './environments/list/public/public.environments.resolver';
import { PrivateEnvironmentsResolver } from './environments/list/private/private.environments.resolver';

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
                component: CallbackComponent,
            },
            {
                path: 'environments',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'list',
                        pathMatch: 'full',
                        component: EnvironmentsListPrivateComponent,
                        resolve: { environments: PrivateEnvironmentsResolver },
                    },
                    {
                        path: 'add',
                        pathMatch: 'full',
                        component: EnvironmentsAddComponent,
                    }
                ]
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
