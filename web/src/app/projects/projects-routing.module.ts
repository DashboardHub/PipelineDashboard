import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Dashboard hub components
import { CreateEditProjectComponent } from './create-edit/create-edit.component';
import { EditProjectResolver } from '../core/resolvers/edit-project.resolver';
import { PublicProjectsComponent } from '../shared/components/public/public.component';

import { ViewProjectComponent } from './view/view.component';
import { ViewProjectResolver } from '../core/resolvers/view-project.resolver';

// Dashboard hub authentication guards
import { AuthGuard } from '../core/guards/authentication.guard';

const routes: Routes = [
    {
        path: '',
        component: PublicProjectsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        component: CreateEditProjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':uid',
        component: ViewProjectComponent,
        resolve: { project: ViewProjectResolver }
    },
    {
        path: ':uid/edit',
        component: CreateEditProjectComponent,
        resolve: { project: EditProjectResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
