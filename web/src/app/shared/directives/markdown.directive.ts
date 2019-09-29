// Core modules
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/**
 * Markdown directive
 */
@Directive({
  selector: '[dashboardMarkdown]',
  exportAs: 'markdown',
})
export class MarkdownDirective implements OnChanges {

  private _original: string;

  private marked: any = (<any>window).marked;

  @Input() dashboardMarkdown: string;

  /**
   * Life cycle method
   */
  constructor(
    protected element: ElementRef
  ) { }

  /**
   * Life cycle on changes method
   */
  ngOnChanges(): void {
    this.marked.setOptions({
      gfm: true,
      sanitize: true,
    });

    if (!this._original) {
      this._original = this.element.nativeElement.innerHTML;
    }

    if (this.dashboardMarkdown) {
      this.element.nativeElement.innerHTML = this.marked(this.dashboardMarkdown);
    } else {
      this.element.nativeElement.innerHTML = this._original;
    }
  }

  /**
   * Render the HTML
   */
  materialRender(): any {

    return {
      heading: (text: string): string => `<h3>${text}</h3>`,
      image: (href: string, title: string, text: string): string => `<img src="${href}" alt="${text}" title="${text}" style="max-width:100%">`,
      link: (href: string, title: string, text: string): string => {
        return `<a href="${href}" target="_blank" ${title ? `title="${title}"` : ''}>${text}</a>`;
      },
    };
  }

}
