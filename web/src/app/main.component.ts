import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation } from '../models/navigation.model';
import { Profile } from '../models/profile.model';
import { environment } from '../environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'dashboard-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {

    public version: string;
    public profile: Profile = new Profile();
    public publicRoutes: Navigation[] = [
        {
            title: 'Public Environments',
            route: '/',
            icon: 'computer'
        }
//    {
//      title: 'Public Projects',
//      route: '/projects',
//      icon: 'group_work',
//    },
    ];
    public privateRoutes: Navigation[] = [
        {
            title: 'My Environments',
            route: '/environments/list',
            icon: 'computer'
        },
//    {
//      title: 'My Projects',
//      route: '/projects',
//      icon: 'group_work',
//    },
        {
            title: 'Add Environment',
            route: '/environments/add',
            icon: 'note_add'
        }
//    {
//      title: 'Add Project',
//      route: '/projects/add',
//      icon: 'playlist_add',
//    },
//    {
//      title: 'Profile',
//      route: '/profile',
//      icon: 'security',
//    },
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

    constructor(
        private router: Router,
        public authService: AuthenticationService,
    ) {
        this.version = environment.version;
    }

    showDoorbell(): void {
        (<any>window).doorbell.show();
    }
}
