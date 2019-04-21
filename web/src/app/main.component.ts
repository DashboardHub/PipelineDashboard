import { Component } from '@angular/core';

import { Navigation } from '../models/navigation.model';
import { environment } from '../environments/environment';

@Component({
    selector: 'dashboard-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {

    public version: string;
    public publicRoutes: Navigation[] = [
        {
            title: 'Homepage',
            route: '/',
            icon: 'home',
        },
    ];
    public privateRoutes: Navigation[] = [
        {
            title: 'My Projects',
            route: '/projects',
            icon: 'group_work',
        },
        {
            title: 'Add Project',
            route: '/projects/create',
            icon: 'playlist_add',
        },
        {
            title: 'Profile',
            route: '/profile',
            icon: 'security',
        },
    ];
    public generalRoutes: Navigation[] = [
        {
            title: 'Features',
            route: '/features',
            icon: 'lightbulb_outline'
        },
        {
            title: 'Help',
            route: '/help',
            icon: 'live_help'
        },
        {
            title: 'Terms & Conditions',
            route: '/terms-and-conditions',
            icon: 'copyright'
        },
        {
            title: 'Privacy',
            route: '/privacy',
            icon: 'gavel'
        }
    ];

    constructor() {
        this.version = environment.version;
    }

    public showDoorbell(): void {
        (<any>window).doorbell.show();
    }
}
