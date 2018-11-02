import { NgModule } from '@angular/core';

import { GaugeModule } from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        GaugeModule
    ],
    exports: [
        GaugeModule
    ]
})
export class ChartsModule {}
