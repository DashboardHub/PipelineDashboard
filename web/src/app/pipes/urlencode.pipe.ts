import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'encodeUri' })
export class EncodeUriPipe implements PipeTransform {
  transform(uri: string): string {
    return encodeURI(uri);
  }
}
