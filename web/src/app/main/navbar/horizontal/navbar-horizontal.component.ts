import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseMainComponent } from '../../main.component';

@Component({
    selector     : 'fuse-navbar-horizontal',
    templateUrl  : './navbar-horizontal.component.html',
    styleUrls    : ['./navbar-horizontal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavbarHorizontalComponent implements OnInit, OnDestroy
{
    constructor(private fuseMainComponent: FuseMainComponent)
    {
    }

    ngOnInit()
    {
        this.fuseMainComponent.addClass('fuse-nav-bar-horizontal');
    }

    ngOnDestroy()
    {
        this.fuseMainComponent.removeClass('fuse-nav-bar-horizontal');
    }
}
