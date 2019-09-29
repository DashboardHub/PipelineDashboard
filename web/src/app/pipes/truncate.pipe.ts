// Core modules
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncate pipe
 */
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(text: any, length: number): string {
    if (typeof text !== 'string') {
      return '';
    }

    let truncated: string = text.substr(0, length);

    if (text.length > length) {
      if (truncated.lastIndexOf(' ') > 0) {
        truncated = truncated.trim();
      }

      truncated += '…';
    }

    return truncated;
  }
}
