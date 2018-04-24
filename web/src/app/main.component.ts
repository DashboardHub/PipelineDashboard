import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation } from "./navigation.model";

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  publicRoutes: Array<Navigation> = [
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
  privateRoutes: Array<Navigation> = [
    {
      title: 'My Environments',
      route: '/',
      icon: 'dashboard',
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
  generalRoutes: Array<Navigation> = [
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
    {
      title: 'Login',
      route: '/login',
      icon: 'vpn_key',
    },
  ];

  constructor(private _router: Router) {
  }

  logout(): void {
    this._router.navigate(['/login']);
  }
}
