// Core modules
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

// Dashboard hub services
import { AuthenticationService } from '@core/services/index.service';

/**
 * Admin Guard
 */
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  /**
   * Life cycle method
   * @param router Router
   * @param authService AuthService
   */
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  /**
   * Protect routes for authenticated user
   * @param next ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   */
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.profile.isAdmin) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}
