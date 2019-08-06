import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as auth0 from 'auth0-js';
import { Profile } from '../../models/profile.model';

import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private auth0: auth0 = new auth0.WebAuth({
        clientID: environment.auth.clientID,
        domain: environment.auth.domain,
        responseType: 'token id_token',
        audience: `https://${environment.auth.domain}/api/v2/`,
        redirectUri: environment.auth.callbackURL,
        scope: 'openid profile write:environments'
    });

    private subject: ReplaySubject<Profile> = new ReplaySubject<Profile>();

    public userProfile: Profile;

    constructor(private router: Router) {
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err: any, authResult: any) => {
            if (err) {
                this.router.navigate(['/']);
            }

            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.getProfile((profileErr: any) => {
                    if (profileErr) {
                        throw new Error('Failed to fetch profile');
                    }
                    this.router.navigate(['/']);
                });
            }

            this.router.navigate(['/']);
        });
    }

    public logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        let profile: Profile = new Profile();
        this.userProfile = profile;
        this.subject.next(profile);

        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        const expiresAt: number = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public getProfile(cb: any): Promise<void> {
        const accessToken: string = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }

        const self: AuthService = this;

        return new Promise<void>((resolve: any) => {
            this.auth0.client.userInfo(accessToken, (err: any, profile: Profile) => {
                if (profile) {
                    self.userProfile = profile;
                    resolve(profile);
                    this.subject.next(profile);
                }
                cb(err);
            });
        });
    }

    public subscribeProfile(): Observable<any> {
        return this.subject.asObservable();
    }

    private setSession(authResult: any): void {
        const expiresAt: string = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }
}
