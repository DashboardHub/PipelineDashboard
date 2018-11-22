import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'digits' })
export class DigitsPipe implements PipeTransform {
    transform(digits: number, precision: number = 1): string {
        if (digits === 0) {
            return '0';
        }

        if (!isFinite(digits)) {
            return '-';
        }

        const units: Array<string> = ['', 'K', 'M', 'B', 'T'];
        const value: number = Math.floor(Math.log(digits) / Math.log(1000));

        if (value === 0) {
            precision = 0;
        }

        return ((digits / Math.pow(1000, Math.floor(value))).toFixed(precision) + ' ' + units[value]).trim();
    }
}
