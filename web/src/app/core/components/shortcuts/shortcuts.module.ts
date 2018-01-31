import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseShortcutsComponent } from './shortcuts.component';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
    declarations: [
        FuseShortcutsComponent
    ],
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        FuseShortcutsComponent
    ]
})
export class FuseShortcutsModule
{
}
