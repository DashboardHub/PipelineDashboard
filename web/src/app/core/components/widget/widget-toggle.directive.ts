import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[fuseWidgetToggle]'
})
export class FuseWidgetToggleDirective implements OnInit, AfterViewInit
{

    constructor(public el: ElementRef)
    {
    }

    ngOnInit()
    {
    }

    ngAfterViewInit()
    {
    }

}
