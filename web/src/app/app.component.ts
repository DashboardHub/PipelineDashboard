import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
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
      .addSvgIconInNamespace('assets', 'github', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'covalent', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'covalent-mark', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'teradata-ux', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'appcenter', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'listener', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'querygrid', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
  }

}
