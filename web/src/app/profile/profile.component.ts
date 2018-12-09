import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Profile, LoginAudit } from '../../models/index.model';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'dashboard-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    private loginsSubscriptions: Subscription;
    public profile: Profile;
    public logins: LoginAudit[];

    constructor(public authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.profile = this.authService.profile;
        this.authService
            .getLogins()
            .subscribe((logins: LoginAudit[]) => this.logins = logins);
    }

    ngDestroy(): void {
        this.loginsSubscriptions
            .unsubscribe();
    }
}
