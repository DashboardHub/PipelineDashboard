// Core modules
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * Confirmation dialog
 */
@Component({
  selector: 'dashboard-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
})
export class DialogConfirmationComponent {

  /**
   * Life cycle method
   * @param dialogRef MatDialogRef
   * @param data data to be send in dialog
   */
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content?: string }
  ) { }

}
