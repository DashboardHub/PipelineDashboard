import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
  ) {
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'dashboardhub',
        this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/logo-horizontal-std.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'dashboardhub_white',
        this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/logo-horizontal-white.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'dashboardhub_icon',
        this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master/icon-only-orange.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'github',
        this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/DashboardHub/Assets/master//github.svg'));
  }
}
