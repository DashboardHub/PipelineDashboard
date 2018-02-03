import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'htmlToPlaintext'})
export class HtmlToPlaintextPipe implements PipeTransform
{
    transform(value: string, args: any[] = [])
    {
        return value ? String(value).replace(/<[^>]+>/gm, '') : '';
    }
}
