// Core modules
import { Injectable } from '@angular/core';

// DashboardHub services
import { AuthenticationService } from '../services/index.service';

// Dashboard hub model and services

@Injectable({
  providedIn: 'root',
})
export class AuthResolver {

  /**
   * Life cycle method
   * @param authService AuthenticationService
   */
  constructor(
    private authService: AuthenticationService
  ) { }

  /**
   * Get the current user and check if authenticated or not
   */
  resolve(): void {
    return this.authService.checkAuth();
  }
}
