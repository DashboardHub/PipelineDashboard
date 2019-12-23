// Core modules
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Number formatter pipe
 */
@Pipe({ name: 'numbers' })
export class NumbersPipe implements PipeTransform {
  transform(digits: number, precision: number = 1): string {
    if (digits > 1000) {
      return Number.isInteger(digits / 100) ? digits / 1000 + 'k' : (digits / 1000).toFixed(1) + 'k';
    }

    return digits.toString();
  }
}
