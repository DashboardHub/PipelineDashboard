import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  canActivate() {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.snackBar.open('Permission Denied', '', { duration: 2000 });

    this.router.navigate(['/login']);
  }
}
