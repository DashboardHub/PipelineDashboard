// Core modules
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

import { environment } from './../environments/environment';

/**
 * App component
 */
@Component({
  selector: 'dashboard-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private ga: Function = (<any>window).ga;

  /**
   * Life cycle method
   * @param router Router
   */
  constructor(
    private router: Router
  ) { }

  /**
   * Initializing the google analytics router events
   */
  public ngOnInit(): void {
    this.ga('create', environment.tracking , 'auto');
    this.ga('send', 'pageview');

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        this.ga('set', 'page', event.urlAfterRedirects);
        this.ga('send', 'pageview');
      }
    });
  }

}
