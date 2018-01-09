import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { PricingComponent } from "./pricing.component";

const routes = [
    {
        path     : 'pricing',
        component: PricingComponent
    }
];

@NgModule({
    declarations: [
      PricingComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
      PricingComponent
    ]
})

export class PricingModule
{
}
