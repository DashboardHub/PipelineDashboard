import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Environment } from '../models/environment.model';
import { EnvironmentService } from './environment.service';

@Injectable({
    providedIn: 'root'
})
export class PublicEnvironmentsResolver implements Resolve<Environment[]> {

    constructor(private environmentService: EnvironmentService) { }

    resolve(): Observable<Environment[]> {
        console.log('RESOLVE');

        this.environmentService.findAll()
            .subscribe((data)=> console.log(data))

        console.log(this.environmentService.findAll())

        return this.environmentService.findAll().pipe(take(1));
    }
}
