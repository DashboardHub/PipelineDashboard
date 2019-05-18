import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'dashboard-dialog-confirmation',
    templateUrl: './dialog-confirmation.component.html',
})
export class DialogConfirmationComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, content?: string },
    ) { }

}
