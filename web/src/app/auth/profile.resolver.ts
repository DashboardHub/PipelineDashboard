import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable()
export class ProfileResolver implements Resolve<any> {

  constructor(private authService: AuthService) { }

  resolve(): Promise<any> {
    if (this.authService.isAuthenticated()) {
      return this.authService
        .getProfile((err) => console.log(err));
    }
  }
}
