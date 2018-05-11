import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as auth0 from 'auth0-js';
import { Profile } from './profile';

import { Observable, ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token id_token',
    audience: `https://${environment.auth.domain}/api/v2/`,
    redirectUri: environment.auth.callbackURL,
    scope: 'openid profile write:environments'
  });

  public userProfile: Profile;

  private subject = new ReplaySubject<Profile>();

  constructor(private router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile((err) => {
          if (err) {
            throw new Error('Failed to fetch profile');
          }
          this.router.navigate(['/']);
        });
      } else if (err) {
        this.router.navigate(['/']);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.subject.next(new Profile());

    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): Promise<void> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;

    return new Promise<void>(resolve => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          self.userProfile = profile;
          resolve(profile);
          this.subject.next(profile);
        }
        cb(err);
      });
    });
  }

  subscribeProfile(): Observable<any> {
    return this.subject.asObservable();
  }
}
