import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { TermsConditionsComponent } from './legal/terms-conditions/terms-conditions.component';
import { ProjectsComponent } from './projects/projects.component';

// import { ProfileResolver } from '../services/profile.resolver';
import { PrivateProjectsComponent } from './projects/private/private.component';
import { AuthGuard } from '../guards/authentication.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: ProjectsComponent,
                // resolve: { profile: ProfileResolver }
            },

            {
                path: 'projects',
                pathMatch: 'full',
                component: PrivateProjectsComponent,
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
