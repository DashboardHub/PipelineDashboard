import { Directive, HostListener, Input } from '@angular/core';
import { FuseNavbarVerticalService } from './navbar-vertical.service';
import { FuseNavbarVerticalComponent } from './navbar-vertical.component';

@Directive({
    selector: '[fuseNavbarVertical]'
})
export class FuseNavbarVerticalToggleDirective
{
    @Input() fuseNavbarVertical: string;
    navbar: FuseNavbarVerticalComponent;

    constructor(private navbarService: FuseNavbarVerticalService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.navbar = this.navbarService.getNavBar();

        if ( !this.navbar[this.fuseNavbarVertical] )
        {
            return;
        }

        this.navbar[this.fuseNavbarVertical]();
    }
}
