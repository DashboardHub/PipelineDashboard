import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'
import { Navigation } from "./navigation.model";
import { AuthService } from "./auth/auth.service";
import { Profile } from "./auth/profile";

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  public version: string;
  public profile: Profile = new Profile('');
  public publicRoutes: Array<Navigation> = [
    {
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    },
    {
      title: 'Public Environments',
      route: '/environments',
      icon: 'computer',
    },
    {
      title: 'Public Projects',
      route: '/projects',
      icon: 'group_work',
    },
  ];
  public privateRoutes: Array<Navigation> = [
    {
      title: 'My Environments',
      route: '/environments/list',
      icon: 'computer',
    },
    {
      title: 'My Projects',
      route: '/projects',
      icon: 'group_work',
    },
    {
      title: 'Add Environment',
      route: '/environments/add',
      icon: 'note_add',
    },
    {
      title: 'Add Project',
      route: '/projects/add',
      icon: 'playlist_add',
    },
    {
      title: 'Profile',
      route: '/profile',
      icon: 'security',
    },
  ];
  public generalRoutes: Array<Navigation> = [
    {
      title: 'Features',
      route: '/features',
      icon: 'lightbulb_outline',
    },
    {
      title: 'Help',
      route: '/help',
      icon: 'live_help',
    },
    // {
    //   title: 'Login',
    //   route: '/login',
    //   icon: 'vpn_key',
    // },
  ];

  constructor(private _router: Router, private authService: AuthService) {
    this.version = environment.version;
    this.authService.subscribeProfile()
      .subscribe(profile => this.profile = profile);

    if (this.authService.isAuthenticated()) {
      this.authService
        .getProfile((err) => err ? console.log(err) : null);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
