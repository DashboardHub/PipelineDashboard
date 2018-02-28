import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { FuseConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs/Subscription';
import { Platform } from '@angular/cdk/platform';
import PerfectScrollbar from 'perfect-scrollbar';

@Directive({
    selector: '[fusePerfectScrollbar]'
})
export class FusePerfectScrollbarDirective implements AfterViewInit, OnDestroy
{
    onSettingsChanged: Subscription;
    isDisableCustomScrollbars = false;
    isMobile = false;
    isInitialized = true;
    ps: PerfectScrollbar;

    constructor(
        public element: ElementRef,
        private fuseConfig: FuseConfigService,
        private platform: Platform
    )
    {
        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (settings) => {
                        this.isDisableCustomScrollbars = !settings.customScrollbars;
                    }
                );

        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.isMobile = true;
        }
    }

    ngAfterViewInit()
    {
        if ( this.isMobile || this.isDisableCustomScrollbars )
        {
            this.isInitialized = false;
            return;
        }

        // Initialize the perfect-scrollbar
        this.ps = new PerfectScrollbar(this.element.nativeElement, {
            wheelPropagation: true
        });
    }

    ngOnDestroy()
    {
        if ( !this.isInitialized || !this.ps )
        {
            return;
        }

        this.onSettingsChanged.unsubscribe();

        // Destroy the perfect-scrollbar
        this.ps.destroy();
    }

    @HostListener('document:click', ['$event'])
    documentClick(event: Event): void
    {
        if ( !this.isInitialized || !this.ps )
        {
            return;
        }

        // Update the scrollbar on document click..
        // This isn't the most elegant solution but there is no other way
        // of knowing when the contents of the scrollable container changes.
        // Therefore, we update scrollbars on every document click.
        this.ps.update();
    }

    update()
    {
        if ( !this.isInitialized )
        {
            return;
        }

        // Update the perfect-scrollbar
        this.ps.update();
    }

    destroy()
    {
        this.ngOnDestroy();
    }

    scrollToX(x: number, speed?: number)
    {
        this.animateScrolling('scrollLeft', x, speed);
    }

    scrollToY(y: number, speed?: number)
    {
        this.animateScrolling('scrollTop', y, speed);
    }

    scrollToTop(offset?: number, speed?: number)
    {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    }

    scrollToLeft(offset?: number, speed?: number)
    {
        this.animateScrolling('scrollLeft', (offset || 0), speed);
    }

    scrollToRight(offset?: number, speed?: number)
    {
        const width = this.element.nativeElement.scrollWidth;

        this.animateScrolling('scrollLeft', width - (offset || 0), speed);
    }

    scrollToBottom(offset?: number, speed?: number)
    {
        const height = this.element.nativeElement.scrollHeight;

        this.animateScrolling('scrollTop', height - (offset || 0), speed);
    }

    animateScrolling(target: string, value: number, speed?: number)
    {
        if ( !speed )
        {
            this.element.nativeElement[target] = value;

            // PS has weird event sending order, this is a workaround for that
            this.update();
            this.update();
        }
        else if ( value !== this.element.nativeElement[target] )
        {
            let newValue = 0;
            let scrollCount = 0;

            let oldTimestamp = performance.now();
            let oldValue = this.element.nativeElement[target];

            const cosParameter = (oldValue - value) / 2;

            const step = (newTimestamp) => {
                scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));

                newValue = Math.round(value + cosParameter + cosParameter * Math.cos(scrollCount));

                // Only continue animation if scroll position has not changed
                if ( this.element.nativeElement[target] === oldValue )
                {
                    if ( scrollCount >= Math.PI )
                    {
                        this.element.nativeElement[target] = value;

                        // PS has weird event sending order, this is a workaround for that
                        this.update();

                        this.update();
                    }
                    else
                    {
                        this.element.nativeElement[target] = oldValue = newValue;

                        oldTimestamp = newTimestamp;

                        window.requestAnimationFrame(step);
                    }
                }
            };

            window.requestAnimationFrame(step);
        }
    }
}
