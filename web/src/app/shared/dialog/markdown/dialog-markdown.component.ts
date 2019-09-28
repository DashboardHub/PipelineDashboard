// Core modules
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * Markdown component
 */
@Component({
  selector: 'dashboard-dialog-markdown',
  templateUrl: './dialog-markdown.component.html',
  styleUrls: ['./dialog-markdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogMarkdownComponent {

  /**
   * Life cycle method
   * @param dialogRef MatDialogRef
   * @param data data to be send in dialog
   */
  constructor(
    public dialogRef: MatDialogRef<DialogMarkdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { icon: string, title: string, content: string }
  ) { }

}
