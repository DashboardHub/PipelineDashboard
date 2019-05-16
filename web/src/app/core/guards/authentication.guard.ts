import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// Dashboard hub services
import { AuthenticationService } from '../services/index.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) {
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated) {
            return true;
        }

        this.router.navigate(['/']);

        return false;
    }
}
