// Core modules
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Encode uri pipe
 */
@Pipe({ name: 'encodeUri' })
export class UrlencodePipe implements PipeTransform {
  transform(uri: string): string {
    return encodeURI(uri);
  }
}
