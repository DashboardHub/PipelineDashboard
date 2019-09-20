// Core modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

// Dashboard hub services
import { AuthenticationService } from '@core/services/index.service';

/**
 * Authentication Guard
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  /**
   * Life cycle method
   * @param router instance of router
   * @param authService instance of authentication service
   */
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  /**
   * Protect routes for authenticated user
   * @param next ActivatedRouteSnapshot instance
   * @param state RouterStateSnapshot instance
   */
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}
