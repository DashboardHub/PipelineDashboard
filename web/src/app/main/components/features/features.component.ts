// Breakpoints components
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Component, OnInit } from '@angular/core';

export interface IFeature {
  icon: string;
  name: string;
  value: boolean | string;
}

@Component({
  selector: 'dashboard-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {

  public starter: IFeature[] = [
    {
      icon: 'github_login_icon',
      name: 'GitHub Login',
      value: true,
    },
    {
      icon: 'public_unviroment_icon',
      name: 'Unlimited public projects',
      value: true,
    },
    {
      icon: 'monitor_enviroments_icon',
      name: 'Monitors per enviroment',
      value: '3 monitor',
    },
    {
      icon: 'private_enviroment_icon',
      name: 'Private enviroments',
      value: '0 private enviroments',
    },
    {
      icon: 'followers_icon',
      name: 'Unlimited followers',
      value: false,
    },
    {
      icon: 'unlim_notification_icon',
      name: 'Unlimited notifications',
      value: false,
    },
    {
      icon: 'webhook_icon',
      name: 'Realtime webhooks',
      value: true,
    },
    {
      icon: 'badges_2_icon',
      name: 'Badges',
      value: false,
    },
    {
      icon: 'graphs_icon',
      name: 'Deployments /  Releases graphs',
      value: false,
    },
    {
      icon: 'export_data_icon',
      name: 'Export data',
      value: false,
    },
    {
      icon: 'managment_icon',
      name: 'User management',
      value: false,
    },
  ];
  public professional: IFeature[] = [
    {
      icon: 'github_login_icon',
      name: 'GitHub Login',
      value: true,
    },
    {
      icon: 'public_unviroment_icon',
      name: 'Unlimited public environments',
      value: true,
    },
    {
      icon: 'monitor_enviroments_icon',
      name: 'Monitors per enviroment',
      value: '5 monitors',
    },
    {
      icon: 'private_enviroment_icon',
      name: 'Private enviroments',
      value: '3 private enviroments',
    },
    {
      icon: 'followers_icon',
      name: 'Unlimited followers',
      value: false,
    },
    {
      icon: 'unlim_notification_icon',
      name: 'Unlimited notifications',
      value: false,
    },
    {
      icon: 'webhook_icon',
      name: 'Notification webhooks',
      value: true,
    },
    {
      icon: 'badges_2_icon',
      name: 'Badges',
      value: false,
    },
    {
      icon: 'graphs_icon',
      name: 'Deployments / Releases graphs',
      value: false,
    },
    {
      icon: 'export_data_icon',
      name: 'Export data',
      value: false,
    },
    {
      icon: 'managment_icon',
      name: 'User management',
      value: false,
    },
  ];
  public enterprise: IFeature[] = [
    {
      icon: 'github_login_icon',
      name: 'GitHub Login',
      value: true,
    },
    {
      icon: 'public_unviroment_icon',
      name: 'Unlimited public environments',
      value: true,
    },
    {
      icon: 'monitor_enviroments_icon',
      name: 'Monitors per enviroment',
      value: '10 monitors',
    },
    {
      icon: 'private_enviroment_icon',
      name: 'Private enviroments',
      value: '50 private enviroments',
    },
    {
      icon: 'followers_icon',
      name: 'Unlimited followers',
      value: false,
    },
    {
      icon: 'unlim_notification_icon',
      name: 'Unlimited notifications',
      value: false,
    },
    {
      icon: 'webhook_icon',
      name: 'Notification webhooks',
      value: true,
    },
    {
      icon: 'badges_2_icon',
      name: 'Badges',
      value: false,
    },
    {
      icon: 'graphs_icon',
      name: 'Deployments / Releases graphs',
      value: false,
    },
    {
      icon: 'sheduled_releases_icon',
      name: 'Scheduled releases',
      value: false,
    },
    {
      icon: 'export_data_icon',
      name: 'Export data',
      value: false,
    },
    {
      icon: 'managment_icon',
      name: 'User management',
      value: false,
    },
  ];
  public isSmallScreen: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
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

  public chekPackValue(value: any): boolean {
    if (typeof value === 'boolean') {
      return true;
    }

    return false;
  }
  public chekPackValueForString(value: any): boolean {
    if (typeof value !== 'string') {
      return true;
    }

    return false;
  }

}
