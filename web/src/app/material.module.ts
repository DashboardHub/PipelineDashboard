import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        FlexLayoutModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        FlexLayoutModule,
    ]
})
export class MaterialModule {
}
