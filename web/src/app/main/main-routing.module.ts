import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Dashboard hub components
import { MainComponent } from './main.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CreateProjectComponent } from '../projects/create/create.component';
import { ViewProjectComponent } from '../projects/view/view.component';
import { ViewProjectResolver } from '../core/resolvers/view-project.resolver';
import { EditProjectComponent } from '../projects/edit/edit.component';
import { EditProjectResolver } from '../core/resolvers/edit-project.resolver';
import { PrivateProjectsComponent } from '../projects/private/private.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeaturesComponent } from './components/features/features.component';
import { HelpComponent } from './components/help/help.component';
import { TermsConditionsComponent } from './components/legal/terms-conditions/terms-conditions.component';
import { PrivacyComponent } from './components/legal/privacy/privacy.component';

import { AuthGuard } from '../core/guards/authentication.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: HomepageComponent
            },
            {
                path: 'projects/create',
                pathMatch: 'full',
                component: CreateProjectComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'project/:uid',
                pathMatch: 'full',
                component: ViewProjectComponent,
                resolve: { project: ViewProjectResolver }
            },
            {
                path: 'project/:uid/edit',
                pathMatch: 'full',
                component: EditProjectComponent,
                resolve: { project: EditProjectResolver }
            },
            {
                path: 'projects',
                pathMatch: 'full',
                component: PrivateProjectsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                pathMatch: 'full',
                component: ProfileComponent,
                canActivate: [AuthGuard]
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
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {}
