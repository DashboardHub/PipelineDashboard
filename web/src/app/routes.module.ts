import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';
import { PublicEnvironmentsResolver } from './environments/list/public/public.environments.resolver';

import { CallbackComponent } from './auth/callback/callback.component';

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