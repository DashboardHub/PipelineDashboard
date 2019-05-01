import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'encodeUri' })
export class UrlencodePipe implements PipeTransform {
    transform(uri: string): string {
        return encodeURI(uri);
    }
}
