import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '../../../../models/list.model';
import { Environment } from '../../../../models/environment.model';
import { EnvironmentService } from '../../../../services/environment.service';

@Injectable()
export class PrivateEnvironmentsResolver implements Resolve<List<Environment>> {

    constructor(private environmentService: EnvironmentService) { }

    resolve(): Observable<List<Environment>> {
        return this.environmentService
            .findAllByOwner();
    }
}
