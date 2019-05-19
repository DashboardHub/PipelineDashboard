import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dashboard-dialog-markdown',
  templateUrl: './dialog-markdown.component.html',
  styleUrls: ['./dialog-markdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogMarkdownComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogMarkdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ) { }

}
