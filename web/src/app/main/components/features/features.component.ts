// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// Core modules
import { Component, OnInit } from '@angular/core';

/**
 * Ifeature interface
 */
export interface IFeature {
  icon: string;
  name: string;
  value: boolean | string;
}

/**
 * Feature component
 */
@Component({
  selector: 'dashboard-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {

  public starter: IFeature[] = [
    {
      icon: 'vpn_key',
      name: 'GitHub Login',
      value: true,
    },
    {
      icon: 'lock_open',
      name: 'Unlimited public projects',
      value: true,
    },
    {
      icon: 'desktop_windows',
      name: 'Monitors per enviroment',
      value: '3 monitor',
    },
    {
      icon: 'lock',
      name: 'Private enviroments',
      value: '0 private enviroments',
    },
    {
      icon: 'person_pin',
      name: 'Unlimited followers',
      value: false,
    },
    {
      icon: 'notification_important',
      name: 'Unlimited notifications',
      value: false,
    },
    {
      icon: 'swap_horizontal_circle',
      name: 'Realtime webhooks',
      value: true,
    },
    {
      icon: 'loyalty',
      name: 'Badges',
      value: false,
    },
    {
      icon: 'poll',
      name: 'Deployments /  Releases graphs',
      value: false,
    },
    {
      icon: 'import_export',
      name: 'Export data',
      value: false,
    },
    {
      icon: 'person',
      name: 'User management',
      value: false,
    },
  ];
  public professional: IFeature[] = [
    {
      icon: 'vpn_key',
      name: 'GitHub Login',
      value: true,
    },
    {
      icon: 'lock_open',
      name: 'Unlimited public environments',
      value: true,
    },
    {
      icon: 'desktop_windows',
      name: 'Monitors per enviroment',
      value: '5 monitors',
    },
    {
      icon: 'lock',
      name: 'Private enviroments',
      value: '3 private enviroments',
    },
    {
      icon: 'person_pin',
      name: 'Unlimited followers',
      value: false,
    },
    {
      icon: 'notification_important',
      name: 'Unlimited notifications',
      value: false,
    },
    {
      icon: 'swap_horizontal_circle',
      name: 'Notification webhooks',
      value: true,
    },
    {
      icon: 'loyalty',
      name: 'Badges',
      value: false,
    },
    {
      icon: 'poll',
      name: 'Deployments / Releases graphs',
      value: false,
    },
    {
      icon: 'import_export',
      name: 'Export data',
      value: false,
    },
    {
      icon: 'person',
      name: 'User management',
      value: false,
    },
  ];
  public enterprise: IFeature[] = [
    {
      icon: 'vpn_key',
      name: 'GitHub Login',
      value: true,
    },
    {
      icon: 'lock_open',
      name: 'Unlimited public environments',
      value: true,
    },
    {
      icon: 'desktop_windows',
      name: 'Monitors per enviroment',
      value: '10 monitors',
    },
    {
      icon: 'lock',
      name: 'Private enviroments',
      value: '50 private enviroments',
    },
    {
      icon: 'person_pin',
      name: 'Unlimited followers',
      value: false,
    },
    {
      icon: 'notification_important',
      name: 'Unlimited notifications',
      value: false,
    },
    {
      icon: 'swap_horizontal_circle',
      name: 'Notification webhooks',
      value: true,
    },
    {
      icon: 'loyalty',
      name: 'Badges',
      value: false,
    },
    {
      icon: 'poll',
      name: 'Deployments / Releases graphs',
      value: false,
    },
    {
      icon: 'schedule',
      name: 'Scheduled releases',
      value: false,
    },
    {
      icon: 'import_export',
      name: 'Export data',
      value: false,
    },
    {
      icon: 'person',
      name: 'User management',
      value: false,
    },
  ];
  public isSmallScreen: boolean;

  /**
   * Life cycle method
   * @param breakpointObserver
   */
  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isSmallScreen = true;
        } else {
          this.isSmallScreen = false;
        }
      });

  }

  /**
   * Check the pack value
   * @param value
   */
  public chekPackValue(value: any): boolean {
    if (typeof value === 'boolean') {
      return true;
    }

    return false;
  }

  /**
   * Check the pack value for string
   * @param value
   */
  public chekPackValueForString(value: any): boolean {
    if (typeof value !== 'string') {
      return true;
    }

    return false;
  }

}
