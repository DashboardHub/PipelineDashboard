import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Third party module
import { FlexLayoutModule } from '@angular/flex-layout';

// Dashboard hub App modules
import { AppMaterialModule } from '../app-material.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, FlexLayoutModule, AppMaterialModule],
    exports: [FlexLayoutModule, AppMaterialModule]
})
export class SharedModule {}
