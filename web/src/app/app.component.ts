import { Component, AfterViewInit } from '@angular/core';
import { delay } from 'rxjs/operators';

// Dashboard hub Icon register
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// Dashboard hub models and services
import { ActivityService } from './core/services/activity.service';
import { AuthenticationService } from './core/services/authentication.service';
import { ProfileModel } from './shared/models/index.model';
import { Navigation } from './shared/models/navigation.model';

import { environment } from './../environments/environment';

@Component({
    selector: 'dashboard-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    public progress: number = 0;
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
    public version: string;

    constructor(
        private _iconRegistry: MatIconRegistry,
        private _domSanitizer: DomSanitizer,
        private authService: AuthenticationService,
        private activityService: ActivityService,
    ) {
        this._iconRegistry
            .addSvgIconInNamespace('assets', 'dashboardhub',
                this._domSanitizer
                    .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/logo-horizontal-std.svg')
            );
        this._iconRegistry
            .addSvgIconInNamespace('assets', 'dashboardhub_white',
                this._domSanitizer
                    .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/logo-horizontal-white.svg')
            );
        this._iconRegistry
            .addSvgIconInNamespace('assets', 'dashboardhub_icon',
                this._domSanitizer
                    .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/icon-only-orange.svg')
            );
        this._iconRegistry
            .addSvgIconInNamespace('assets', 'github',
                this._domSanitizer
                    .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master//github.svg')
            );
        this.version = environment.version;
    }

    ngAfterViewInit(): void {
        this.activityService
            .getProgressBar()
            .pipe(delay(0))
            .subscribe((progress: number) => this.progress = progress);
    }

    public getProfile(): ProfileModel {
        return this.authService.profile;
    }

    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    public login(): void {
        this.authService.login();
    }

    public logout(): void {
        this.authService.logout();
    }

    public showDoorbell(): void {
        (<any>window).doorbell.show();
    }
}
