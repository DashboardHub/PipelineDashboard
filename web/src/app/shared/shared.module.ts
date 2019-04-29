import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Third party module
import { FlexLayoutModule } from '@angular/flex-layout';

// Dashboard hub App modules
import { AppMaterialModule } from '../app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, FlexLayoutModule, AppMaterialModule, ReactiveFormsModule, PipesModule],
    exports: [FlexLayoutModule, AppMaterialModule, ReactiveFormsModule, PipesModule]
})
export class SharedModule { }
