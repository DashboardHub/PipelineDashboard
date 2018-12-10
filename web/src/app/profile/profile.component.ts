import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileModel, LoginAuditModel } from '../../models/index.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'dashboard-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    private loginsSubscriptions: Subscription;
    public profile: ProfileModel;
    public logins: LoginAuditModel[];

    constructor(public authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.profile = this.authService.profile;
        this.authService
            .getLogins()
            .subscribe((logins: LoginAuditModel[]) => this.logins = logins);
    }

    ngDestroy(): void {
        this.loginsSubscriptions
            .unsubscribe();
    }
}
