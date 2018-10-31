import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AuthService } from '../app/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {

    constructor(private authService: AuthService) { }

    resolve(): Promise<any> {
        if (this.authService.isAuthenticated()) {
            return this.authService
                .getProfile((err: any) => err ? console.log(err) : undefined);
        }
    }
}
