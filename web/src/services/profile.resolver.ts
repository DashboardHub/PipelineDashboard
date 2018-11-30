import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {

    resolve(): Promise<any> {
        return Promise.resolve();
    }
}
