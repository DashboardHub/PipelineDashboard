import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatRadioModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
    ],
    exports: [
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
    ]
})
export class MaterialModule {
}
