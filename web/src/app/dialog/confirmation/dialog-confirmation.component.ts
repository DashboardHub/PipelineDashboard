import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'qs-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
})
export class DialogConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content?: string },
  ) { }
}
