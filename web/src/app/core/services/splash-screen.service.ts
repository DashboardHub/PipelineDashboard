import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class FuseSplashScreenService
{
    splashScreenEl;
    public player: AnimationPlayer;

    constructor(
        private animationBuilder: AnimationBuilder,
        @Inject(DOCUMENT) private document: any,
        private router: Router
    )
    {
        // Get the splash screen element
        this.splashScreenEl = this.document.body.querySelector('#fuse-splash-screen');

        // If the splash screen element exists...
        if ( this.splashScreenEl )
        {
            // Hide it on the first NavigationEnd event
            const hideOnLoad = this.router.events.subscribe((event) => {
                    if ( event instanceof NavigationEnd )
                    {
                        setTimeout(() => {
                            this.hide();

                            // Unsubscribe from this event so it
                            // won't get triggered again
                            hideOnLoad.unsubscribe();
                        }, 0);
                    }
                }
            );
        }
    }

    show()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({
                        opacity: '0',
                        zIndex : '99999'
                    }),
                    animate('400ms ease', style({opacity: '1'}))
                ]).create(this.splashScreenEl);

        setTimeout(() => {
            this.player.play();
        }, 0);
    }

    hide()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({opacity: '1'}),
                    animate('400ms ease', style({
                        opacity: '0',
                        zIndex : '-10'
                    }))
                ]).create(this.splashScreenEl);

        setTimeout(() => {
            this.player.play();
        }, 0);
    }
}
