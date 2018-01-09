import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseDemoContentComponent } from './demo-content/demo-content.component';
import { FuseDemoSidenavComponent } from './demo-sidenav/demo-sidenav.component';

@NgModule({
    declarations: [
        FuseDemoContentComponent,
        FuseDemoSidenavComponent
    ],
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        FuseDemoContentComponent,
        FuseDemoSidenavComponent
    ]
})
export class FuseDemoModule
{
}
