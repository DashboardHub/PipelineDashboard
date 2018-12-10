import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { TermsConditionsComponent } from './legal/terms-conditions/terms-conditions.component';

import { PrivateProjectsComponent } from './projects/private/private.component';
import { AuthGuard } from '../guards/authentication.guard';
// import { ProfileResolver } from '../resolvers/profile.resolver';
import { ProfileComponent } from './profile/profile.component';
import { CreateProjectComponent } from './projects/create/create.component';
import { PublicProjectsComponent } from './projects/public/public.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        // resolve: { profile: ProfileResolver },
        children: [
            {
                path: '',
                component: PublicProjectsComponent,
            },
            {
                path: 'projects',
                pathMatch: 'full',
                component: PrivateProjectsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'projects/create',
                pathMatch: 'full',
                component: CreateProjectComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'profile',
                pathMatch: 'full',
                component: ProfileComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'features',
                pathMatch: 'full',
                component: FeaturesComponent
            },
            {
                path: 'help',
                pathMatch: 'full',
                component: HelpComponent,
            },
            {
                path: 'terms-and-conditions',
                pathMatch: 'full',
                component: TermsConditionsComponent
            },
            {
                path: 'privacy',
                pathMatch: 'full',
                component: PrivacyComponent,
            },
            { path: '**', redirectTo: '/' },
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
