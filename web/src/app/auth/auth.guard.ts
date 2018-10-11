import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        private auth: AuthService,
        private snackBar: MatSnackBar
    ) {
    }

    canActivate(): Observable<boolean> | boolean {
        if (this.auth.isAuthenticated()) {
            return true;
        }

        this.snackBar.open('Permission Denied', '', { duration: 2000 });
        this.router.navigate(['/login']);
    }
}
