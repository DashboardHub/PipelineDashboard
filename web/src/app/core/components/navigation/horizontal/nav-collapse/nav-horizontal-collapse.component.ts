import { Component, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { fuseAnimations } from '../../../../animations';
import { FuseConfigService } from '../../../../services/config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector   : 'fuse-nav-horizontal-collapse',
    templateUrl: './nav-horizontal-collapse.component.html',
    styleUrls  : ['./nav-horizontal-collapse.component.scss'],
    animations : fuseAnimations
})
export class FuseNavHorizontalCollapseComponent implements OnDestroy
{
    onSettingsChanged: Subscription;
    fuseSettings: any;
    isOpen = false;

    @HostBinding('class') classes = 'nav-item nav-collapse';
    @Input() item: any;

    @HostListener('mouseenter')
    open()
    {
        this.isOpen = true;
    }

    @HostListener('mouseleave')
    close()
    {
        this.isOpen = false;
    }

    constructor(
        private fuseConfig: FuseConfigService
    )
    {
        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                    }
                );
    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }
}
