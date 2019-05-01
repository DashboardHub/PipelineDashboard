import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Dashboard hub components
import { CreateProjectComponent } from './create/create.component';
import { EditProjectComponent } from './edit/edit.component';
import { EditProjectResolver } from '../core/resolvers/edit-project.resolver';
import { PrivateProjectsComponent } from './private/private.component';
import { ViewProjectComponent } from './view/view.component';
import { ViewProjectResolver } from '../core/resolvers/view-project.resolver';

// Dashboard hub authentication guards
import { AuthGuard } from '../core/guards/authentication.guard';

const routes: Routes = [
    {
        path: '',
        component: PrivateProjectsComponent,
    },
    {
        path: 'create',
        component: CreateProjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':uid',
        component: ViewProjectComponent,
        resolve: { project: ViewProjectResolver }
    },
    {
        path: ':uid/edit',
        component: EditProjectComponent,
        resolve: { project: EditProjectResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
