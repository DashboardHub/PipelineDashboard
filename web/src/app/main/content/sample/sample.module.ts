import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseSampleComponent } from './sample.component';

const routes = [
    {
        path     : 'sample',
        component: FuseSampleComponent
    }
];

@NgModule({
    declarations: [
        FuseSampleComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        FuseSampleComponent
    ]
})

export class FuseSampleModule
{
}
