import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector     : 'app-help-article',
  templateUrl  : './article.component.html',
  styleUrls    : ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpArticleComponent
{
  constructor(
    public dialogRef: MatDialogRef<HelpArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
  }
}
