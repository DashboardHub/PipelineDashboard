import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe for stripe of the trailing slash
 */
@Pipe({
  name: 'stripeSlash',
})
export class StripeSlashPipe implements PipeTransform {

  transform(value: string): string {
    if (value.endsWith('/')) {
      const index: number = value.lastIndexOf('\/');
      value = value.substring(0, index);
    }
    return value;
  }
}
