import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'camelCaseToDash'})
export class CamelCaseToDashPipe implements PipeTransform
{
    transform(value: string, args: any[] = [])
    {
        return value ? String(value).replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`) : '';
    }
}
