import { ActivityModel } from './activity.model';
export class UserStatsModel {
    name: string;
    username: string;
    avatarUrl: string = '';
    github: {
        repository: {
            total: number,
        },
        activity: {
            latest: ActivityModel,
        },
    };
    lastUpdated: Date;
}
