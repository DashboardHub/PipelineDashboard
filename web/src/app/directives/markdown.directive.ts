import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
    selector: '[dashboardMarkdown]',
    exportAs: 'markdown'
})
export class MarkdownDirective implements OnChanges {

    private _original: string;

    private marked = (<any>window).marked;

    @Input() dashboardMarkdown: string;

    constructor(
        protected element: ElementRef
    ) { }

    ngOnChanges(): void {
        this.marked.setOptions({
            gfm: true,
            sanitize: true
        });

        if (!this._original) {
            this._original = this.element.nativeElement.innerHTML;
        }

        if (this.dashboardMarkdown) {
            this.element.nativeElement.innerHTML = this.marked(this.dashboardMarkdown, { renderer: this.materialRender() });
        } else {
            this.element.nativeElement.innerHTML = this._original;
        }
    }

    materialRender() {
        const renderer = new this.marked.Renderer();

        renderer['heading'] = (text, level) => `<h3>${text}</h3>`;

        renderer['image'] = (href, title, text) => `<img src="${href}" alt="${text}" title="${text}" style="max-width:100%">`;

        renderer['link'] = (href, title, text) => {
            return `<a href="${href}" target="_blank" ${title ? `title="${title}"` : ''}>${text}</a>`;
        };

        return renderer;
    }

}
