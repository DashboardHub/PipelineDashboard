import { Component, Input } from '@angular/core';

import { DigitsPipe } from '../../../pipes/digits.pipe';

import { Environment } from '../../../models/environment.model';
import { Profile } from '../../../models/profile.model';

@Component({
    selector: 'dashboard-environments-list',
    templateUrl: './environments-list.component.html',
    styleUrls: ['./environments-list.component.scss']
})
export class EnvironmentsListComponent {

    public _environments: Environment[] = [];
    @Input()
    public set environments(environments: Environment[]) {
        this._environments = environments;
        // this.calculateSummary();
        // this.calculateUptime();
        // this.calculateLatestPing();
    }

    public get environments(): Environment[] {
        return this._environments;
    }

    public profile: Profile = new Profile();
    public summary: any;
    public uptime: { name: string, value: number }[];
    public pings: { name: string, value: number }[];

    calculateSummary(): void {
        let environments: number = 0;
        let releases: number = 0;
        let monitors: number = 0;
        let views: number = 0;
        let pings: number = 0;
        this.environments.forEach((environment: Environment) => {
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
        this.uptime = this.environments
            .filter((environment: Environment) => environment.pings && (environment.pings.valid || environment.pings.invalid))
            .slice(0, 12)
            .map((environment: Environment) => (
                {
                    name: environment.title,
                    value: (environment.pings.valid / (environment.pings.valid + environment.pings.invalid)) * 100 || 0
                }
            ));
    }

    calculateLatestPing(): void {
        this.pings = this.environments
            .filter((environment: Environment) => environment.latestPing && environment.latestPing.duration)
            .slice(0, 12)
            .map((environment: Environment) => (
                {
                    name: environment.title,
                    value: environment.latestPing.duration ? environment.latestPing.duration : 0
                }
            ));
    }

    axisDigits(label: any): any {
        if (label === 0) {
            return '';
        }
        return new DigitsPipe().transform(label);
    }
}
