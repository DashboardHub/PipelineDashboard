import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { AuthenticationService } from '../../../core/services/index.service';
import { LoginAuditModel, ProfileModel } from '../../../shared/models/index.model';

@Component({
    selector: 'dashboard-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    private loginsSubscription: Subscription;
    public profile: ProfileModel;
    public logins: LoginAuditModel[] = [];

    constructor(public authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.profile = this.authService.profile;
        this.loginsSubscription = this.authService
            .getLogins()
            .subscribe((logins: LoginAuditModel[]) => this.logins = logins);
    }

    ngDestroy(): void {
        this.loginsSubscription
            .unsubscribe();
    }
}
