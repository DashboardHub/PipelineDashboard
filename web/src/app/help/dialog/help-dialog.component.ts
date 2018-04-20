import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'qs-help-dialog',
  templateUrl: './help-dialog.component.html',
})
export class HelpDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
