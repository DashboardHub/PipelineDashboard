import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dashboard-dialog-markdown',
  templateUrl: './dialog-markdown.component.html',
})
export class DialogMarkdownComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogMarkdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ) { }

}
