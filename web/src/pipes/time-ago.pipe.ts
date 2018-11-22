import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
    transform(referenceDate: Date): string {
        referenceDate = new Date(referenceDate);

        if (!referenceDate.getTime()) {
            return 'Invalid Date';
        }

        const date: Date = new Date();
        let lapse: number = Math.floor((date.getTime() - referenceDate.getTime()) / 1000);

        // Seconds
        if (lapse < 2) {
            return '1 second ago';
        }

        if (lapse < 60) {
            return Math.floor(lapse) + ' seconds ago';
        }

        // Minutes
        lapse /= 60;
        if (lapse < 2) {
            return '1 minute ago';
        }

        if (lapse < 60) {
            return Math.floor(lapse) + ' minutes ago';
        }

        // Hours
        lapse /= 60;
        if (lapse < 2) {
            return '1 hour ago';
        }

        if (lapse < 24) {
            return Math.floor(lapse) + ' hours ago';
        }

        // Days
        lapse /= 24;
        if (lapse < 2) {
            return '1 day ago';
        }

        if (lapse < 30) {
            return Math.floor(lapse) + ' days ago';
        }

        // Weeks
        lapse /= 7;
        if (lapse < 2) {
            return '1 week ago';
        }

        if (lapse < 4.3) {
            return Math.floor(lapse) + ' weeks ago';
        }

        // Months
        lapse /= 4.3;
        if (lapse < 2) {
            return '1 month ago';
        }

        if (lapse < 12) {
            return Math.floor(lapse) + ' months ago';
        }

        // Years
        lapse /= 12;
        if (lapse < 2) {
            return '1 year ago';
        }

        return Math.floor(lapse) + ' years ago';
    }
}
