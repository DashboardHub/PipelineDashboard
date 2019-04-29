import { Pipe, PipeTransform } from '@angular/core';

export enum TypeData {
    build = 'Build',
    deploy = 'Deploy',
    'build-deploy' = 'Build & Deploy',
}

@Pipe({ name: 'environmentType' })
export class EnvironmentTypePipe implements PipeTransform {
    transform(type: string): string {
        return TypeData[type];
    }
}
