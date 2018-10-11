import { Component, Input } from '@angular/core';

import { List } from '../../../models/list.model';
import { Environment } from '../../../models/environment.model';
import { Profile } from '../../../models/profile.model';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'dashboard-environments-list',
    templateUrl: './environments-list.component.html',
    styleUrls: ['./environments-list.component.scss']
})
export class EnvironmentsListComponent {

    public _environments: List<Environment> = new List<Environment>();
    @Input()
    public set environments(environments: List<Environment>) {
        this._environments = environments;
        this.calculateSummary();
        this.calculateUptime();
        this.calculateLatestPing();
    }

    public get environments(): List<Environment> { return this._environments; }

    public profile: Profile = new Profile();
    public summary: any;
    public uptime: { name: string, value: number }[];
    public pings: { name: string, value: number }[];

    constructor(private authService: AuthService) {
        this.authService.subscribeProfile().subscribe((profile: Profile) => this.profile = profile);
    }

    calculateSummary(): void {
        let environments: number = 0;
        let releases: number = 0;
        let monitors: number = 0;
        let views: number = 0;
        let pings: number = 0;
        this.environments.list.forEach((environment: Environment) => {
            environments++;
            releases += environment.releases;
            monitors += environment.monitors ? environment.monitors.length : 0;
            views += environment.views ? environment.views : 0;
            pings += environment.pings.valid + environment.pings.invalid;
        });
        this.summary = [
            { name: 'Environments', value: environments, icon: 'developer_board' },
            { name: 'Releases', value: releases, icon: 'new_releases' },
            { name: 'Monitors', value: monitors, icon: 'timelapse' },
            { name: 'Pings', value: pings, icon: 'receipt' },
            { name: 'Views', value: views, icon: 'record_voice_over' }
        ];
    }

    calculateUptime(): void {
        this.uptime = this.environments.list
            .map((environment: Environment) => (
                { name: environment.title, value: (environment.pings.valid / (environment.pings.valid + environment.pings.invalid)) * 100 || 0 }
            ));
    }

    calculateLatestPing(): void {
        this.pings = this.environments.list.map((environment: Environment) => {
            return { name: environment.title, value: environment.latestPing.duration ? environment.latestPing.duration : 0 };
        });
    }

    // axisDigits(val: any): any {
    //   return new TdDigitsPipe().transform(val);
    // }
}
